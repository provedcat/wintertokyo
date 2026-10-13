import assert from 'node:assert/strict';
import {trips,duration,minutes} from './app/trip.ts';
import {routeSegments,pointForStop} from './app/route-data.ts';
assert.equal(trips.length,5);
assert.equal(trips[0].stops[0].time,'05:36');
assert.equal(trips[1].stops.find(s=>s.sourceRow===23).time,'17:00');
assert.ok(!JSON.stringify(trips[2]).includes('하얏트'));
assert.equal(trips[4].stops.at(-1).time,'21:50');
assert.equal(trips[4].stops.at(-2).time,'18:55');
for(const trip of trips){
 for(const [i,s] of trip.stops.entries()){
  if(s.time)assert.match(s.time,/^\d{2}:\d{2}$/);
  if(s.end&&s.time)assert.ok(minutes(s.end)>=minutes(s.time));
  assert.ok(duration(s)>=0);
  if(i&&s.time&&trip.stops[i-1].end)assert.ok(minutes(s.time)>=minutes(trip.stops[i-1].end));
 }
 assert.equal(routeSegments(trip.points).length,trip.points.length-1);
 for(const p of trip.points){assert.ok(p.stop>=0&&p.stop<trip.stops.length);assert.ok(p.lat>=-90&&p.lat<=90&&p.lng>=-180&&p.lng<=180)}
 for(let i=0;i<trip.stops.length;i++){const p=pointForStop(i,trip.points);assert.ok(p>=0&&p<trip.points.length)}
}
assert.ok(!JSON.stringify(trips).includes('Palcious'));
console.log('Five-day timetable ordering, map associations, reservation conflict, and unknown arrival checks passed.');

const {allowedOrigin,withCors,preflight}=await import('./app/api/cors.ts');
const url='https://tokyo-christmas-rimi.grimmpark.chatgpt.site/api/packing';
const pagesRequest=new Request(url,{headers:{Origin:'https://provedcat.github.io'}});
assert.ok(allowedOrigin(pagesRequest));
assert.equal(preflight(pagesRequest).status,204);
assert.ok(!allowedOrigin(new Request(url,{headers:{Origin:'https://example.org'}})));
assert.equal(preflight(new Request(url,{headers:{Origin:'https://example.org'}})).status,403);
assert.equal((await withCors(pagesRequest,async()=>Response.json([]))).headers.get('Access-Control-Allow-Origin'),'https://provedcat.github.io');
console.log('Pages subpath asset references and API origin restrictions verified.');
