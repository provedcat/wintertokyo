const pagesOrigin='https://provedcat.github.io';
export function allowedOrigin(request:Request){const origin=request.headers.get('origin');return origin===new URL(request.url).origin||origin===pagesOrigin}
export async function withCors(request:Request,handler:(request:Request)=>Promise<Response>){
 const response=await handler(request);
 if(request.headers.get('origin')===pagesOrigin){response.headers.set('Access-Control-Allow-Origin',pagesOrigin);response.headers.set('Vary','Origin')}
 return response;
}
export function preflight(request:Request){if(!allowedOrigin(request))return new Response(null,{status:403});return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':request.headers.get('origin')!,'Access-Control-Allow-Methods':'GET,POST,PATCH,OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'600','Vary':'Origin'}})}
