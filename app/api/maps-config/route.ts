import { env } from 'cloudflare:workers';
export async function GET() {
  // Browser Maps keys are returned to the browser; restrict this key to the Site's domain in Google Cloud.
  if (!env.MAPS_BROWSER_KEY) return Response.json({error:'지도 설정을 준비하고 있어요.'},{status:503});
  return Response.json({key:env.MAPS_BROWSER_KEY},{headers:{'Cache-Control':'no-store'}});
}
