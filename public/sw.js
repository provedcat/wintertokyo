const CACHE='tokyo-v8';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(u.origin!==self.location.origin||e.request.method!=='GET'||u.pathname.startsWith('/api/')||u.search.includes('_rsc'))return;
 // Cache only assets and successfully opened pages; shared lists always use the server.
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r}).catch(()=>caches.match(e.request).then(r=>r||new Response('오프라인입니다. 미리 내려받은 여행 일정 파일을 열어주세요.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}}))));
});
