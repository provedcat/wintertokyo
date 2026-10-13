'use client';
import {useEffect,useState} from 'react';
import TravelMap from '../travel-map';
import {trips,type RoutePoint} from '../trip';
export default function MapView(){
 const [state,setState]=useState({points:trips[0].points,active:0,overview:true});
 useEffect(()=>{function receive(e:MessageEvent){if(e.source!==window.parent||e.origin!=='https://provedcat.github.io'||e.data?.type!=='winter-map-state')return;const d=e.data;if(!Array.isArray(d.points)||d.points.length<1||d.points.length>50||!Number.isInteger(d.active)||typeof d.overview!=='boolean')return;if(!d.points.every((p:RoutePoint)=>typeof p.name==='string'&&p.name.length<150&&Number.isFinite(p.lat)&&Math.abs(p.lat)<=90&&Number.isFinite(p.lng)&&Math.abs(p.lng)<=180&&Number.isInteger(p.stop)&&p.stop>=0))return;setState({points:d.points,active:d.active,overview:d.overview})}window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive)},[]);
 return <div className="map-embed"><TravelMap key={JSON.stringify(state.points)} {...state} onSelect={stop=>window.parent.postMessage({type:'winter-map-select',stop},'https://provedcat.github.io')}/></div>
}
