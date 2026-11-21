import { writeFile, readFile, mkdir } from "node:fs/promises";

const URL_MINETUR =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";
const SALIDA = "public/data/estaciones.json";
const HISTORICO = "public/data/historico.json";

function parsePrice(val) {
  if (!val) return null;
  const num = parseFloat(String(val).replace(",", "."));
  return Number.isNaN(num) ? null : num;
}

const response = await fetch(URL_MINETUR, { signal: AbortSignal.timeout(120000) });
if (!response.ok) throw new Error(`El Ministerio respondió ${response.status}`);
const raw = await response.json();

const brandsSet = new Set();

const estaciones = raw.ListaEESSPrecio.map((station) => {
  const lat = parsePrice(station["Latitud"]);
  const lon = parsePrice(station["Longitud (WGS84)"]);
  const rotulo = station["Rótulo"]?.trim() || "OTRA";
  brandsSet.add(rotulo);

  return {
    id: station["IDEESS"],
    rotulo,
    direccion: station["Dirección"]?.trim() || "",
    municipio: station["Municipio"]?.trim() || "",
    provincia: station["Provincia"]?.trim() || "",
    horario: station["Horario"]?.trim() || "No especificado",
    lat,
    lon,
    precios: {
      gasolina95: parsePrice(station["Precio Gasolina 95 E5"]),
      gasolina98: parsePrice(station["Precio Gasolina 98 E5"]),
      gasoleoA: parsePrice(station["Precio Gasoleo A"]),
      gasoleoPremium: parsePrice(station["Precio Gasoleo Premium"]),
      glp: parsePrice(station["Precio Gases licuados del petróleo"]),
      gnc: parsePrice(station["Precio Gas natural comprimido"]),
    },
  };
}).filter((s) => s.lat !== null && s.lon !== null);

// Si el Ministerio devuelve muy pocos datos, no sobrescribimos el archivo bueno.
if (estaciones.length < 1000) {
  throw new Error(`Datos insuficientes (${estaciones.length}), no se guarda nada`);
}

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
