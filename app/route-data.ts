import type {RoutePoint} from './trip';
export function pointForStop(stop:number,points:RoutePoint[]){let current=0;points.forEach((p,i)=>{if(p.stop<=stop)current=i});return current}
export function routeSegments(points:RoutePoint[]){return points.slice(1).map((p,i)=>({from:points[i],to:p,kind:p.kind}))}
