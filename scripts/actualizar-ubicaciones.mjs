// Corrige automáticamente las coordenadas de las gasolineras usando OpenStreetMap.
// Se ejecuta una vez a la semana desde GitHub Actions y genera public/data/correcciones-auto.json,
// que luego aplica actualizar-precios.mjs. Las correcciones manuales (correcciones.json) tienen prioridad.
import { writeFile, mkdir } from "node:fs/promises";
import { descargarEstaciones } from "./ministerio.mjs";
import { emparejar } from "./emparejar-osm.mjs";

const SALIDA = "public/data/correcciones-auto.json";
const SERVIDORES = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];
const CONSULTA = `[out:json][timeout:300];
area["ISO3166-1"="ES"][admin_level=2]->.es;
nwr["amenity"="fuel"](area.es);
out center tags;`;

async function descargarOsm() {
  for (const url of SERVIDORES) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "mapfuel (github.com/alvaro-xv/gasolineras)",
        },
        body: "data=" + encodeURIComponent(CONSULTA),
        signal: AbortSignal.timeout(360000),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const json = await res.json();
      return json.elements
        .map((el) => ({
          lat: el.lat ?? el.center?.lat,
          lon: el.lon ?? el.center?.lon,
          brand: el.tags?.brand,
          name: el.tags?.name,
          operator: el.tags?.operator,
        }))
        .filter((o) => typeof o.lat === "number" && typeof o.lon === "number");
    } catch (err) {
      console.warn(`Overpass ${url} falló: ${err.message}`);
    }
  }
  throw new Error("No se pudo descargar OpenStreetMap de ningún servidor");
}

const [estaciones, osm] = await Promise.all([descargarEstaciones(), descargarOsm()]);
console.log(`Ministerio: ${estaciones.length} · OpenStreetMap: ${osm.length}`);

// Si OSM devuelve muy pocas, algo ha ido mal: no tocamos el archivo bueno
if (osm.length < 5000) throw new Error(`OpenStreetMap devolvió solo ${osm.length} gasolineras`);

const { correcciones, emparejadas, corregidas } = emparejar(estaciones, osm);
await mkdir("public/data", { recursive: true });
await writeFile(SALIDA, JSON.stringify({ generado: new Date().toISOString(), fuente: "© OpenStreetMap contributors (ODbL)", correcciones }));
console.log(`OK: ${emparejadas} emparejadas, ${corregidas} con la ubicación corregida`);
