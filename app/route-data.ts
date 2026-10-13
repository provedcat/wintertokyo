// Public regional reference points, not terminal-specific entrances or private accommodation.
export const routePoints = [
 {name:'인천공항',lat:37.4602,lng:126.4407,stop:0},
 {name:'나리타공항',lat:35.7720,lng:140.3929,stop:1},
 {name:'츠쿠바센터',lat:36.0820,lng:140.1115,stop:3},
];
export function pointForStop(stop:number){return stop===0?0:stop===1?1:2}
export function routeSegments(){return routePoints.slice(1).map((point,i)=>({from:routePoints[i],to:point,kind:i===0?'flight':'bus'}))}
