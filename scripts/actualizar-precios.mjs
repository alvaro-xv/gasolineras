import { writeFile, readFile, mkdir } from "node:fs/promises";
import { descargarEstaciones } from "./ministerio.mjs";

const SALIDA = "public/data/estaciones.json";
const HISTORICO = "public/data/historico.json";
const CORRECCIONES_AUTO = "public/data/correcciones-auto.json"; // generadas con OpenStreetMap
const CORRECCIONES = "public/data/correcciones.json";            // puestas a mano (tienen prioridad)

async function leerJson(ruta, porDefecto) {
  try {
    return JSON.parse(await readFile(ruta, "utf8"));
  } catch {
    return porDefecto;
  }
}

const estaciones = await descargarEstaciones();
const brandsSet = new Set(estaciones.map((s) => s.rotulo));

// Corregir ubicaciones que el Ministerio tiene desplazadas
const auto = (await leerJson(CORRECCIONES_AUTO, {})).correcciones || {};
const manual = await leerJson(CORRECCIONES, {});
let corregidas = 0;
for (const s of estaciones) {
  const c = manual[s.id] || auto[s.id];
  if (c && typeof c.lat === "number" && typeof c.lon === "number") {
    s.lat = c.lat;
    s.lon = c.lon;
    corregidas++;
  }
}
console.log(`Ubicaciones corregidas: ${corregidas}`);

const salida = {
  fechaActualizacion: new Date().toISOString(),
  total: estaciones.length,
  marcas: Array.from(brandsSet).sort((a, b) => a.localeCompare(b)),
  estaciones,
};

await mkdir("public/data", { recursive: true });
await writeFile(SALIDA, JSON.stringify(salida));
console.log(`OK: ${estaciones.length} estaciones guardadas`);

// ---------- Histórico: precio medio de cada combustible, un registro por día ----------
// Si el script se ejecuta varias veces el mismo día, se queda el último dato de ese día.
const medias = {};
for (const combustible of Object.keys(estaciones[0].precios)) {
  const precios = estaciones.map((s) => s.precios[combustible]).filter((p) => p !== null && p > 0);
  if (precios.length) {
    medias[combustible] = Math.round((precios.reduce((a, b) => a + b, 0) / precios.length) * 1000) / 1000;
  }
}
const fecha = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(new Date()); // AAAA-MM-DD

let historico = { dias: [] };
try {
  historico = JSON.parse(await readFile(HISTORICO, "utf8"));
} catch {
  // Primera vez: aún no existe el archivo
}
historico.dias = (historico.dias || [])
  .filter((d) => d.fecha !== fecha)
  .concat({ fecha, medias })
  .sort((a, b) => a.fecha.localeCompare(b.fecha));

await writeFile(HISTORICO, JSON.stringify(historico));
console.log(`OK: histórico con ${historico.dias.length} días`);
