// Descarga y normaliza las gasolineras del Ministerio (compartido por los scripts)

const URL_MINETUR =
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";

function parsePrice(val) {
  if (!val) return null;
  const num = parseFloat(String(val).replace(",", "."));
  return Number.isNaN(num) ? null : num;
}

export async function descargarEstaciones() {
  const response = await fetch(URL_MINETUR, { signal: AbortSignal.timeout(120000) });
  if (!response.ok) throw new Error(`El Ministerio respondió ${response.status}`);
  const raw = await response.json();

  const estaciones = raw.ListaEESSPrecio.map((station) => ({
    id: station["IDEESS"],
    rotulo: station["Rótulo"]?.trim() || "OTRA",
    direccion: station["Dirección"]?.trim() || "",
    municipio: station["Municipio"]?.trim() || "",
    provincia: station["Provincia"]?.trim() || "",
    horario: station["Horario"]?.trim() || "No especificado",
    lat: parsePrice(station["Latitud"]),
    lon: parsePrice(station["Longitud (WGS84)"]),
    precios: {
      gasolina95: parsePrice(station["Precio Gasolina 95 E5"]),
      gasolina98: parsePrice(station["Precio Gasolina 98 E5"]),
      gasoleoA: parsePrice(station["Precio Gasoleo A"]),
      gasoleoPremium: parsePrice(station["Precio Gasoleo Premium"]),
      glp: parsePrice(station["Precio Gases licuados del petróleo"]),
      gnc: parsePrice(station["Precio Gas natural comprimido"]),
    },
  })).filter((s) => s.lat !== null && s.lon !== null);

  // Si el Ministerio devuelve muy pocos datos, mejor no tocar nada
  if (estaciones.length < 1000) {
    throw new Error(`Datos insuficientes (${estaciones.length}), no se guarda nada`);
  }
  return estaciones;
}
