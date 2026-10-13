import assert from 'node:assert/strict';
import {stops,duration,minutes} from './app/trip.ts';
assert.equal(duration(stops[2]),65);
for(let i=0;i<stops.length;i++){
 assert.ok(duration(stops[i])>0);
 if(i)assert.equal(minutes(stops[i-1].end),minutes(stops[i].time));
}
assert.equal(stops.reduce((n,s)=>n+duration(s),0),660);
assert.equal(duration(stops[0])*1.6/(duration(stops[1])*1.6),1.25);
assert.ok(!JSON.stringify(stops).includes('Palcious'));
console.log('Timeline continuity, proportional durations, and private-address exclusion passed.');
const {routePoints,routeSegments,pointForStop}=await import('./app/route-data.ts');
assert.equal(routePoints.length,3);
assert.deepEqual(routeSegments().map(s=>s.kind),['flight','bus']);
assert.deepEqual([0,1,2,3,4,5].map(pointForStop),[0,1,2,2,2,2]);
for(const p of routePoints){assert.ok(p.lat>=-90&&p.lat<=90&&p.lng>=-180&&p.lng<=180)}
console.log('Route ordering, transport styles, and timeline marker mapping passed.');
