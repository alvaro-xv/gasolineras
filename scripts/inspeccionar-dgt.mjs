// Descarga los datos oficiales de puntos de recarga y genera un informe con qué campos traen,
// cuántos hay de cada uno y ejemplos. Prueba varias fuentes por si alguna está caída.
// Solo sirve para explorar los datos: no modifica nada de la web.
import { writeFile, mkdir } from "node:fs/promises";

const FUENTES = [
  { nombre: "DGT (infocar)", url: "https://infocar.dgt.es/datex2/v3/miterd/EnergyInfrastructureTablePublication/electrolineras.xml" },
  { nombre: "DGT (nap)", url: "https://nap.dgt.es/datex2/v3/miterd/EnergyInfrastructureTablePublication/electrolineras.xml" },
  { nombre: "Ministerio RIPREE (CSV)", url: "https://energia.serviciosmin.gob.es/Ripree/ExportarInstalaciones/Export" },
];
const SALIDA = "informes/dgt-recarga.md";
const lineas = [];
const log = (t = "") => { lineas.push(t); console.log(t); };
const recorta = (t, n) => (t.length > n ? t.slice(0, n) + "\n…(recortado)" : t);

async function descargar(url) {
  let ultimo = null;
  for (let intento = 1; intento <= 3; intento++) {
    try {
      const t0 = Date.now();
      const res = await fetch(url, {
        headers: { "User-Agent": "mapfuel (github.com/alvaro-xv/gasolineras)", "Accept": "*/*" },
        signal: AbortSignal.timeout(300000),
      });
      const buf = Buffer.from(await res.arrayBuffer());
      ultimo = { res, buf, segundos: (Date.now() - t0) / 1000, intento };
      if (res.ok) return ultimo;
    } catch (err) {
      ultimo = { error: err.message, intento };
    }
    await new Promise((r) => setTimeout(r, 5000 * intento));
  }
  return ultimo;
}

function analizarXml(xml) {
  const cuenta = new Map();
  for (const m of xml.matchAll(/<([A-Za-z_][\w.-]*:)?([A-Za-z_][\w.-]*)[\s>\/]/g)) {
    const nombre = (m[1] || "") + m[2];
    cuenta.set(nombre, (cuenta.get(nombre) || 0) + 1);
  }
  const ordenadas = [...cuenta.entries()].sort((a, b) => b[1] - a[1]);
  log("\n#### Etiquetas (de más a menos frecuentes)\n");
  log("| Etiqueta | Veces |\n|---|---|");
  ordenadas.slice(0, 250).forEach(([n, c]) => log(`| \`${n}\` | ${c} |`));

  const interesantes = ordenadas.map(([n]) => n).filter((n) =>
    /price|rate|tarif|cost|amount|currency|fee|power|connector|plug|socket|status|availab|operator|owner|name|address|opening|value|type|mode|voltage|current/i.test(n));
  log("\n#### Valores de ejemplo de etiquetas interesantes\n");
  for (const n of interesantes) {
    const esc = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const valores = new Map();
    for (const m of xml.matchAll(new RegExp(`<${esc}(?:\\s[^>]*)?>([^<]{1,120})</${esc}>`, "g"))) {
      const v = m[1].trim();
      if (v) valores.set(v, (valores.get(v) || 0) + 1);
      if (valores.size >= 400) break;
    }
    if (!valores.size) continue;
    const top = [...valores.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)
      .map(([v, c]) => `\`${v.replace(/\|/g, "/")}\` (${c})`).join(", ");
    log(`- **${n}**: ${top}`);
  }

  const abre = xml.search(/<([\w-]+:)?energyInfrastructureSite[\s>]/);
  if (abre >= 0) {
    const etiqueta = xml.slice(abre + 1).match(/^([\w-]+:)?energyInfrastructureSite/)[0];
    const cierre = `</${etiqueta}>`;
    log("\n#### Ejemplo completo de un sitio (el primero)\n");
    log("```xml\n" + recorta(xml.slice(abre, xml.indexOf(cierre, abre) + cierre.length), 20000) + "\n```");
    const mitad = xml.indexOf(`<${etiqueta}`, Math.floor(xml.length / 2));
    if (mitad > 0) {
      log("\n#### Otro ejemplo (de la mitad del archivo)\n");
      log("```xml\n" + recorta(xml.slice(mitad, xml.indexOf(cierre, mitad) + cierre.length), 20000) + "\n```");
    }
  } else {
    log("\n#### Inicio del archivo\n");
    log("```xml\n" + recorta(xml, 15000) + "\n```");
  }
}

function analizarCsv(texto) {
  const filas = texto.split(/\r?\n/).filter((l) => l.trim());
  log(`\n#### CSV: ${filas.length - 1} filas de datos\n`);
  log("Cabecera:\n\n```\n" + filas[0] + "\n```");
  log("\nPrimeras 8 filas:\n\n```\n" + filas.slice(1, 9).join("\n") + "\n```");
  log("\nFilas de la mitad:\n\n```\n" + filas.slice(Math.floor(filas.length / 2), Math.floor(filas.length / 2) + 5).join("\n") + "\n```");
}

log("# Informe de los datos oficiales de puntos de recarga");
log("");
log(`Fecha: ${new Date().toISOString()}`);

for (const f of FUENTES) {
  log(`\n## ${f.nombre}\n`);
  log(`- URL: ${f.url}`);
  const r = await descargar(f.url);
  if (!r || r.error) {
    log(`- ERROR tras ${r?.intento} intentos: ${r?.error}`);
    continue;
  }
  const tipo = r.res.headers.get("content-type") || "";
  log(`- Respuesta: HTTP ${r.res.status} · ${tipo} · intento ${r.intento}`);
  log(`- Tamaño: ${(r.buf.length / 1024 / 1024).toFixed(2)} MB · ${r.segundos.toFixed(1)} s`);
  if (!r.res.ok) {
    log("\n```\n" + recorta(r.buf.toString("utf8").replace(/<style[\s\S]*?<\/style>/, ""), 1500) + "\n```");
    continue;
  }
  // Excel en vez de CSV: lo indicamos y seguimos
  if (r.buf[0] === 0x50 && r.buf[1] === 0x4b) {
    log("- El archivo es un ZIP/XLSX (no texto). Habría que procesarlo con una librería de Excel.");
    continue;
  }
  let texto = r.buf.toString("utf8");
  if (texto.includes("�")) texto = r.buf.toString("latin1");
  if (texto.trimStart().startsWith("<")) analizarXml(texto);
  else analizarCsv(texto);
}

await mkdir("informes", { recursive: true });
await writeFile(SALIDA, lineas.join("\n") + "\n");
console.log(`\nInforme guardado en ${SALIDA}`);
