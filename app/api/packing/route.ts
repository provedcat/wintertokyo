import { and, eq } from 'drizzle-orm';
import { getDb } from '../../../db';
import { packing } from '../../../db/schema';
const owners = ['공용', '리미', '티고', '요니'];
export async function GET() {
  try { return Response.json(await getDb().select().from(packing), {headers:{'Cache-Control':'no-store'}}); }
  catch { return Response.json({error:'공동 목록을 불러오지 못했어요.'}, {status:503}); }
}
export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return new Response(null,{status:403});
  if (Number(request.headers.get('content-length')) > 2048) return new Response(null,{status:413});
  try {
    const body = await request.json() as Record<string, unknown>;
    if (!body || typeof body !== 'object') return new Response(null,{status:400});
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title || title.length > 80 || !(typeof body.owner === 'string' && owners.includes(body.owner))) return Response.json({error:'준비물 이름과 담당자를 확인해주세요.'},{status:400});
    const [item] = await getDb().insert(packing).values({id:crypto.randomUUID(),title,owner:body.owner}).returning();
    return Response.json(item,{status:201});
  } catch { return Response.json({error:'저장하지 못했어요. 연결을 확인해주세요.'},{status:503}); }
}
export async function PATCH(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return new Response(null,{status:403});
  try {
    const b = await request.json() as Record<string, unknown>;
    if (!b || typeof b !== 'object') return new Response(null,{status:400});
    if (typeof b.id !== 'string' || typeof b.version !== 'number' || !Number.isInteger(b.version) || typeof b.done !== 'boolean') return new Response(null,{status:400});
    const changes: {done:boolean;version:number;title?:string;owner?:string} = {done:b.done,version:b.version+1};
    if (b.title !== undefined) {
      if (typeof b.title !== 'string' || !b.title.trim() || b.title.trim().length > 80 || !(typeof b.owner === 'string' && owners.includes(b.owner))) return new Response(null,{status:400});
      changes.title=b.title.trim();changes.owner=b.owner;
    }
    const [item] = await getDb().update(packing).set(changes).where(and(eq(packing.id,b.id),eq(packing.version,b.version))).returning();
    return item ? Response.json(item) : Response.json({error:'다른 사람이 수정했어요. 새 목록을 확인해주세요.'},{status:409});
  } catch { return Response.json({error:'변경하지 못했어요. 연결을 확인해주세요.'},{status:503}); }
}
