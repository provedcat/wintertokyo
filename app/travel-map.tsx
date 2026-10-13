'use client';
import {useEffect,useRef,useState} from 'react';
import {backendOrigin,isGitHubPages} from './client-config';
import {mapStatePacket} from './map-protocol';
import {routeSegments,pointForStop} from './route-data';
import type {RoutePoint} from './trip';
type Position={lat:number;lng:number};
type MapHandle={fitBounds:(bounds:Bounds,padding:number)=>void;panTo:(p:Position)=>void;setZoom:(z:number)=>void};
type Bounds={extend:(p:Position)=>void};
type Line={setMap:(m:MapHandle|null)=>void;setOptions:(o:Record<string,unknown>)=>void};
type Marker={map:MapHandle|null;addListener:(name:string,callback:()=>void)=>{remove:()=>void}};
type MapsAPI={Map:new(el:HTMLElement,options:Record<string,unknown>)=>MapHandle;LatLngBounds:new()=>Bounds;Polyline:new(options:Record<string,unknown>)=>Line;SymbolPath:{FORWARD_CLOSED_ARROW:number};importLibrary:(name:string)=>Promise<unknown>};
type MarkerAPI={AdvancedMarkerElement:new(options:Record<string,unknown>)=>Marker};
declare global{interface Window{google?:{maps:MapsAPI};tokyoMapReady?:()=>void;gm_authFailure?:()=>void}}
let loading:Promise<MapsAPI>|null=null;
function loadMaps(){
 if(window.google?.maps)return Promise.resolve(window.google.maps);
 if(loading)return loading;
 loading=(async()=>{
  const r=await fetch('/api/maps-config',{cache:'no-store'});
  if(!r.ok)throw Error('지도 설정을 불러오지 못했어요.');
  const config=await r.json() as {key?:string};if(!config.key)throw Error('지도 키가 설정되지 않았어요.');const key=config.key;
  return new Promise<MapsAPI>((resolve,reject)=>{
   const script=document.createElement('script');
   const timer=setTimeout(()=>reject(Error('지도를 불러오는 데 시간이 걸려요. 연결을 확인해주세요.')),20000);
   window.tokyoMapReady=()=>{clearTimeout(timer);if(window.google)resolve(window.google.maps);else reject(Error('지도를 시작하지 못했어요.'))};
   window.gm_authFailure=()=>{clearTimeout(timer);window.dispatchEvent(new Event('tokyo-map-auth-error'));reject(Error('지도 사용 설정을 확인해야 해요.'))};
   script.src='https://maps.googleapis.com/maps/api/js?'+new URLSearchParams({key,v:'weekly',loading:'async',callback:'tokyoMapReady',language:'ko',region:'JP'});
   script.async=true;script.onerror=()=>{clearTimeout(timer);reject(Error('Google 지도에 연결하지 못했어요.'))};document.head.appendChild(script);
  });
 })();return loading;
}
function GoogleTravelMap({points:routePoints,active,overview,onSelect}:{points:RoutePoint[];active:number;overview:boolean;onSelect:(index:number)=>void}){
 const host=useRef<HTMLDivElement>(null),handles=useRef<{map:MapHandle;api:MapsAPI;pins:HTMLElement[];lines:Line[]}|null>(null),select=useRef(onSelect);
 select.current=onSelect;
 const [ready,setReady]=useState(false),[error,setError]=useState(''),[scope,setScope]=useState<'all'|'japan'>('all');
 useEffect(()=>{
  let cancelled=false;let markers:Marker[]=[];let lines:Line[]=[];
  const auth=()=>setError('地図を表示できません · 지도 API와 허용 웹사이트 설정을 확인해주세요.');window.addEventListener('tokyo-map-auth-error',auth);
  loadMaps().then(async api=>{
   const markerAPI=await api.importLibrary('marker') as MarkerAPI;
   if(cancelled||!host.current)return;
   const map=new api.Map(host.current,{center:routePoints[0],zoom:12,mapId:'DEMO_MAP_ID',mapTypeControl:false,streetViewControl:false,fullscreenControl:true,gestureHandling:'cooperative'});
   const grouped=new Map<string,HTMLElement>();const pins=routePoints.map((p,i)=>{const key=p.lat+','+p.lng;const old=grouped.get(key);if(old){old.textContent+='·'+String(i+1);return old}const pin=document.createElement('div');pin.className='route-pin';pin.textContent=String(i+1);grouped.set(key,pin);const marker=new markerAPI.AdvancedMarkerElement({map,position:{lat:p.lat,lng:p.lng},title:`${i+1}. ${p.name}`,content:pin});marker.addListener('click',()=>select.current(p.stop));markers.push(marker);return pin});
   lines=routeSegments(routePoints).map(segment=>new api.Polyline({map,path:[segment.from,segment.to],geodesic:true,strokeColor:segment.kind==='flight'?'#e28b50':'#ce6c87',strokeOpacity:segment.kind==='flight'?0:0.85,strokeWeight:4,icons:segment.kind==='flight'?[{icon:{path:'M 0,-1 0,1',strokeOpacity:1,scale:3},offset:'0',repeat:'15px'},{icon:{path:api.SymbolPath.FORWARD_CLOSED_ARROW,strokeOpacity:1,fillOpacity:1,scale:3},offset:'65%'}]:[{icon:{path:api.SymbolPath.FORWARD_CLOSED_ARROW,scale:3},offset:'65%'}]}));
   handles.current={map,api,pins,lines};setReady(true);
  }).catch(e=>{if(!cancelled)setError(e.message)});
  return()=>{cancelled=true;window.removeEventListener('tokyo-map-auth-error',auth);markers.forEach(m=>m.map=null);lines.forEach(l=>l.setMap(null));handles.current=null};
 },[]);
 useEffect(()=>{const h=handles.current;if(!h)return;const point=pointForStop(active,routePoints);new Set(h.pins).forEach(p=>p.classList.toggle('selected',p===h.pins[point]));h.lines.forEach((l,i)=>l.setOptions({strokeColor:(point===i+1)?'#c65a39':i===0?'#e28b50':'#ce6c87',strokeWeight:point===i+1?6:4}));if(!overview){h.map.panTo(routePoints[point]);h.map.setZoom(routePoints[point].region==='KR'||routePoints[point].name.includes('공항')?10:13)}},[active,overview,ready]);
 useEffect(()=>{const h=handles.current;if(!h||!overview)return;const bounds=new h.api.LatLngBounds();(scope==='all'?routePoints:routePoints.filter(p=>p.region==='JP')).forEach(p=>bounds.extend(p));h.map.fitBounds(bounds,42)},[overview,scope,ready]);
 return <div className={overview?'travel-map overview':'travel-map'}><div ref={host} className="google-map" aria-label="방문 순서가 연결된 Google 지도"/>{!ready&&!error&&<div className="map-loading" role="status">Google 지도를 불러오는 중…</div>}{error&&<div className="map-loading error" role="alert">{error}<a href={'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(routePoints[0].name)} target="_blank" rel="noreferrer">Google 지도 앱에서 보기 ↗</a></div>}{overview&&routePoints.some(p=>p.region==='KR')&&<div className="map-controls"><button aria-pressed={scope==='all'} onClick={()=>setScope('all')}>전체 이동</button><button aria-pressed={scope==='japan'} onClick={()=>setScope('japan')}>일본 구간 확대</button></div>}</div>
}

type MapProps={points:RoutePoint[];active:number;overview:boolean;onSelect:(index:number)=>void};
function HostedMap(props:MapProps){
 const frame=useRef<HTMLIFrameElement>(null),latest=useRef(props);latest.current=props;
 const send=()=>frame.current?.contentWindow?.postMessage(mapStatePacket(latest.current),backendOrigin);
 useEffect(()=>{send()},[props.points,props.active,props.overview]);
 useEffect(()=>{function receive(e:MessageEvent){if(e.origin!==backendOrigin||e.source!==frame.current?.contentWindow)return;if(e.data?.type==='winter-map-ready'){send();return}if(e.data?.type!=='winter-map-select')return;const stop=e.data.stop;if(Number.isInteger(stop)&&latest.current.points.some(p=>p.stop===stop))latest.current.onSelect(stop)}window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive)},[]);
 return <iframe ref={frame} className={props.overview?'hosted-map overview':'hosted-map'} title="여행 동선 지도" src={backendOrigin+'/map-view?v=2'} onLoad={send} allow="fullscreen"/>;
}
export default function TravelMap(props:MapProps){return isGitHubPages()?<HostedMap {...props}/>:<GoogleTravelMap {...props}/>}
