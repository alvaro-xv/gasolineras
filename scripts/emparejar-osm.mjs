// Empareja cada gasolinera del Ministerio con la misma gasolinera en OpenStreetMap
// para corregir las coordenadas que el Ministerio tiene desplazadas.

// Distancias máximas para aceptar que son la misma gasolinera (en metros)
const MAX_MISMA_MARCA = 300;   // si la marca coincide
const MAX_SIN_MARCA = 60;      // si no sabemos la marca de alguna de las dos
const MIN_CORRECCION = 10;     // por debajo de esto no merece la pena mover el pin

// Marcas agrupadas (rótulos distintos que son la misma red)
const FAMILIAS = {
  repsol: ["repsol", "campsa", "petronor"],
  moeve: ["cepsa", "moeve"],
  bp: ["bp"],
  shell: ["shell"],
  galp: ["galp"],
  disa: ["disa"],
  avia: ["avia"],
  ballenoil: ["ballenoil"],
  plenoil: ["plenoil"],
  petroprix: ["petroprix"],
  alcampo: ["alcampo"],
  carrefour: ["carrefour"],
  eroski: ["eroski"],
  esclatoil: ["esclatoil", "bonarea", "bon area"],
  gasexpress: ["gasexpress", "gas express"],
  meroil: ["meroil"],
  valcarce: ["valcarce"],
  q8: ["q8", "kuwait"],
  agla: ["agla"],
  tamoil: ["tamoil"],
  esso: ["esso"],
  simon: ["simon grup"],
  lowcost: ["low cost repostaje"],
  costco: ["costco"],
  gmoil: ["gm oil", "gmoil"],
};

function normaliza(txt) {
  return (txt || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function familia(txt) {
  const t = " " + normaliza(txt).replace(/[^a-z0-9]+/g, " ") + " ";
  for (const [fam, alias] of Object.entries(FAMILIAS)) {
    if (alias.some((a) => t.includes(" " + a + " "))) return fam;
  }
  return null;
}

// Palabras significativas, para comparar marcas que no están en la lista
function palabras(txt) {
  return new Set(
    normaliza(txt).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !["estacion", "servicio", "gasolinera", "carburantes", "combustibles", "petroleos"].includes(w))
  );
}

function distancia(lat1, lon1, lat2, lon2) {
  const R = 6371000, r = Math.PI / 180;
  const dLat = (lat2 - lat1) * r, dLon = (lon2 - lon1) * r;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

// ¿Pueden ser la misma gasolinera? Devuelve "marca", "neutro" o null (incompatibles)
function compatibles(est, osm) {
  const textoOsm = [osm.brand, osm.name, osm.operator].filter(Boolean).join(" ");
  const fe = familia(est.rotulo), fo = familia(textoOsm);
  if (fe && fo) return fe === fo ? "marca" : null;
  const pe = palabras(est.rotulo), po = palabras(textoOsm);
  for (const w of pe) if (po.has(w)) return "marca";
  return "neutro";
}

/**
 * estaciones: [{ id, rotulo, lat, lon }] (coordenadas originales del Ministerio)
 * osm:        [{ lat, lon, brand, name, operator }]
 * Devuelve { correcciones: { id: { lat, lon, m } }, emparejadas, corregidas }
 */
export function emparejar(estaciones, osm) {
  // Índice en rejilla de ~1 km para buscar rápido
  const CELDA = 0.01;
  const rejilla = new Map();
  osm.forEach((o, i) => {
    const k = `${Math.floor(o.lat / CELDA)},${Math.floor(o.lon / CELDA)}`;
    if (!rejilla.has(k)) rejilla.set(k, []);
    rejilla.get(k).push(i);
  });

  // Todas las parejas posibles
  const parejas = [];
  estaciones.forEach((e, ei) => {
    const cy = Math.floor(e.lat / CELDA), cx = Math.floor(e.lon / CELDA);
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        for (const oi of rejilla.get(`${cy + dy},${cx + dx}`) || []) {
          const o = osm[oi];
          const d = distancia(e.lat, e.lon, o.lat, o.lon);
          if (d > MAX_MISMA_MARCA) continue;
          const tipo = compatibles(e, o);
          if (!tipo) continue;
          if (tipo === "neutro" && d > MAX_SIN_MARCA) continue;
          parejas.push({ ei, oi, d, marca: tipo === "marca" });
        }
      }
    }
  });

  // Asignación uno a uno: primero las de misma marca, y dentro de eso las más cercanas
  parejas.sort((a, b) => (b.marca - a.marca) || (a.d - b.d));
  const usadaE = new Set(), usadaO = new Set();
  const correcciones = {};
  let emparejadas = 0;
  for (const p of parejas) {
    if (usadaE.has(p.ei) || usadaO.has(p.oi)) continue;
    usadaE.add(p.ei);
    usadaO.add(p.oi);
    emparejadas++;
    if (p.d >= MIN_CORRECCION) {
      const e = estaciones[p.ei], o = osm[p.oi];
      correcciones[e.id] = { lat: +o.lat.toFixed(6), lon: +o.lon.toFixed(6), m: Math.round(p.d) };
    }
  }
  return { correcciones, emparejadas, corregidas: Object.keys(correcciones).length };
}
