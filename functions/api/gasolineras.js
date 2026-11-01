let cachedData = null;
let cachedBrands = [];
let lastFetchTime = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 minutos

export async function onRequest(context) {
  try {
    const now = Date.now();
    if (!cachedData || (now - lastFetchTime) > CACHE_TTL) {
      const response = await fetch("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/");
      if (!response.ok) {
        throw new Error("Error al obtener datos del Ministerio");
      }
      const rawData = await response.json();
      
      const brandsSet = new Set();

      cachedData = rawData.ListaEESSPrecio.map(station => {
        const parsePrice = (val) => {
          if (!val) return null;
          const num = parseFloat(val.replace(',', '.'));
          return isNaN(num) ? null : num;
        };

        const lat = parsePrice(station["Latitud"]);
        const lon = parsePrice(station["Longitud (WGS84)"]);
        const rotulo = station["Rótulo"]?.trim() || "OTRA";

        if (rotulo) brandsSet.add(rotulo);

        return {
          id: station["IDEESS"],
          rotulo: rotulo,
          direccion: station["Dirección"]?.trim() || "",
          municipio: station["Municipio"]?.trim() || "",
          provincia: station["Provincia"]?.trim() || "",
          horario: station["Horario"]?.trim() || "No especificado",
          lat: lat,
          lon: lon,
          precios: {
            "gasolina95": parsePrice(station["Precio Gasolina 95 E5"]),
            "gasolina98": parsePrice(station["Precio Gasolina 98 E5"]),
            "gasoleoA": parsePrice(station["Precio Gasoleo A"]),
            "gasoleoPremium": parsePrice(station["Precio Gasoleo Premium"]),
            "glp": parsePrice(station["Precio Gases licuados del petróleo"]),
            "gnc": parsePrice(station["Precio Gas natural comprimido"])
          }
        };
      }).filter(s => s.lat !== null && s.lon !== null);

      cachedBrands = Array.from(brandsSet).sort((a, b) => a.localeCompare(b));
      lastFetchTime = now;
    }

    return new Response(JSON.stringify({
      fechaActualizacion: new Date(lastFetchTime).toISOString(),
      total: cachedData.length,
      marcas: cachedBrands,
      estaciones: cachedData
    }), {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Cache-Control": "public, max-age=1800"
      }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}