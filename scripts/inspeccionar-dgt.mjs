// Descarga el XML de puntos de recarga de la DGT (DATEX II) y genera un informe
// con qué campos trae, cuántos hay de cada uno y un ejemplo completo de un punto.
// Solo sirve para explorar los datos: no modifica nada de la web.
import { writeFile, mkdir } from "node:fs/promises";

const URL_DGT = "https://infocar.dgt.es/datex2/v3/miterd/EnergyInfrastructureTablePublication/electrolineras.xml";
const SALIDA = "informes/dgt-recarga.md";
const lineas = [];
const log = (t = "") => { lineas.push(t); console.log(t); };

log("# Informe del XML de puntos de recarga de la DGT");
log("");
log(`- Fecha: ${new Date().toISOString()}`);
log(`- URL: ${URL_DGT}`);

let xml = "";
try {
  const t0 = Date.now();
  const res = await fetch(URL_DGT, {
    headers: { "User-Agent": "mapfuel (github.com/alvaro-xv/gasolineras)" },
    signal: AbortSignal.timeout(300000),
  });
  log(`- Respuesta: HTTP ${res.status} ${res.headers.get("content-type") || ""}`);
  xml = await res.text();
  log(`- Tamaño: ${(xml.length / 1024 / 1024).toFixed(1)} MB · descarga en ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  if (!res.ok) log("\n```\n" + xml.slice(0, 2000) + "\n```");
} catch (err) {
  log(`- ERROR al descargar: ${err.message}`);
}

if (xml.length > 1000) {
  // Cuántas veces aparece cada etiqueta
  const cuenta = new Map();
  for (const m of xml.matchAll(/<([A-Za-z_][\w.-]*:)?([A-Za-z_][\w.-]*)[\s>\/]/g)) {
    const nombre = (m[1] || "") + m[2];
    cuenta.set(nombre, (cuenta.get(nombre) || 0) + 1);
  }
  const ordenadas = [...cuenta.entries()].sort((a, b) => b[1] - a[1]);
  log("\n## Etiquetas (de más a menos frecuentes)\n");
  log("| Etiqueta | Veces |\n|---|---|");
  ordenadas.forEach(([n, c]) => log(`| \`${n}\` | ${c} |`));

  // Valores de ejemplo de cualquier etiqueta que huela a precio, tarifa, potencia o conector
  const interesantes = ordenadas.map(([n]) => n).filter((n) =>
    /price|rate|tarif|cost|amount|currency|fee|power|connector|plug|socket|status|availab|operator|name|address|opening/i.test(n));
  log("\n## Valores de ejemplo de etiquetas interesantes\n");
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

  // Un punto de recarga completo como ejemplo (el primero y uno del medio)
  const abre = xml.search(/<([\w-]+:)?energyInfrastructureSite[\s>]/);
  if (abre >= 0) {
    const etiqueta = xml.slice(abre + 1).match(/^([\w-]+:)?energyInfrastructureSite/)[0];
    const cierre = `</${etiqueta}>`;
    const fin = xml.indexOf(cierre, abre);
    log("\n## Ejemplo completo de un sitio (el primero)\n");
    log("```xml\n" + xml.slice(abre, fin + cierre.length).split("\n").slice(0, 400).join("\n") + "\n```");
    const mitad = xml.indexOf(`<${etiqueta}`, Math.floor(xml.length / 2));
    if (mitad > 0) {
      const fin2 = xml.indexOf(cierre, mitad);
      log("\n## Otro ejemplo (de la mitad del archivo)\n");
      log("```xml\n" + xml.slice(mitad, fin2 + cierre.length).split("\n").slice(0, 400).join("\n") + "\n```");
    }
  } else {
    log("\n## Inicio del archivo\n");
    log("```xml\n" + xml.slice(0, 15000) + "\n```");
  }
}

await mkdir("informes", { recursive: true });
await writeFile(SALIDA, lineas.join("\n") + "\n");
console.log(`\nInforme guardado en ${SALIDA}`);
