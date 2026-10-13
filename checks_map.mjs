import assert from 'node:assert/strict';
import {trips} from './app/trip.ts';
import {mapStatePacket,readMapState} from './app/map-protocol.ts';
let current={points:trips[0].points,active:0,overview:true};
// Switch days before the embedded map announces readiness; use the latest state at send time.
const onReady=()=>readMapState(mapStatePacket(current));
for(const trip of trips){current={points:trip.points,active:0,overview:true};assert.deepEqual(onReady().points,trip.points)}
assert.equal(readMapState(null),null);
assert.equal(readMapState({...mapStatePacket(current),active:-1}),null);
assert.equal(readMapState({...mapStatePacket(current),points:[null]}),null);
assert.equal(readMapState({...mapStatePacket(current),points:[{name:'bad',lat:91,lng:0,stop:0}]}),null);
console.log('All five dates survive map state transfer; malformed messages are rejected.');
