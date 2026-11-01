// Sirve el JSON que genera la GitHub Action en public/data/estaciones.json
export async function onRequest(context) {
  const url = new URL("/data/estaciones.json", context.request.url);
  const response = await fetch(url);

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Datos no disponibles" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Cache-Control": "public, max-age=1800",
    },
  });
}
