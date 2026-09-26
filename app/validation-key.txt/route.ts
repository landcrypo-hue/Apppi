export async function GET() {
  const validationKey =
    "8f4db23a293665a95a386be51615749ff72232ca1bd3d2b00754162c1293f9e9fa515e354133f94c2f6299f613ea3f77a5e62c1a5c54a77b0eb364ed6f9a04f5"

  return new Response(validationKey, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
