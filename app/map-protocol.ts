import type {RoutePoint} from './trip';
export type MapState={points:RoutePoint[];active:number;overview:boolean};
export function mapStatePacket(state:MapState){return {type:'winter-map-state',points:state.points,active:state.active,overview:state.overview}}
export function readMapState(value:unknown):MapState|null{
 if(!value||typeof value!=='object')return null;
 const d=value as Record<string,unknown>;
 if(d.type!=='winter-map-state'||!Array.isArray(d.points)||d.points.length<1||d.points.length>50||typeof d.active!=='number'||!Number.isInteger(d.active)||d.active<0||typeof d.overview!=='boolean')return null;
 if(!d.points.every(p=>p&&typeof p.name==='string'&&p.name.length<150&&Number.isFinite(p.lat)&&Math.abs(p.lat)<=90&&Number.isFinite(p.lng)&&Math.abs(p.lng)<=180&&Number.isInteger(p.stop)&&p.stop>=0))return null;
 return {points:d.points as RoutePoint[],active:d.active,overview:d.overview};
}
