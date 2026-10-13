'use client';
import {useEffect,useState} from 'react';
import TravelMap from '../travel-map';
import {readMapState,type MapState} from '../map-protocol';
const parentOrigin='https://provedcat.github.io';
export default function MapView(){
 const [state,setState]=useState<MapState|null>(null);
 useEffect(()=>{
  let received=false;
  function receive(e:MessageEvent){
   if(e.source!==window.parent||e.origin!==parentOrigin)return;
   const next=readMapState(e.data);if(!next)return;
   received=true;clearInterval(timer);setState(next);
  }
  window.addEventListener('message',receive);
  // React hydration may finish after iframe load. Keep announcing readiness until the parent responds.
  const announce=()=>{if(!received)window.parent.postMessage({type:'winter-map-ready'},parentOrigin)};
  const timer=setInterval(announce,500);announce();
  return()=>{clearInterval(timer);window.removeEventListener('message',receive)};
 },[]);
 return <div className="map-embed">{state?<TravelMap key={JSON.stringify(state.points)} {...state} onSelect={stop=>window.parent.postMessage({type:'winter-map-select',stop},parentOrigin)}/>:<div className="map-loading" role="status">선택한 날짜의 동선을 불러오는 중…</div>}</div>
}
