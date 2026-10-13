export const minutes = (time:string) => {const [h,m]=time.split(':').map(Number);return h*60+m};
export const stops = [
 {time:'08:30',end:'11:00',title:'인천 → 나리타',label:'항공 이동',place:'Narita International Airport',detail:'리미 · 티고가 함께 출발해요. 11:00 도착은 기존 시안의 계획 시각이며 항공권으로 확인이 필요해요.',kind:'flight'},
 {time:'11:00',end:'13:00',title:'나리타공항 도착',label:'입국 · 점심 · 버스 준비',place:'Narita International Airport',detail:'입국 심사와 수하물 수령 후 츠쿠바센터행 NATT’S 버스 승차장을 확인해요. 항공편 터미널은 아직 확인 전이에요.',kind:'stay'},
 {time:'13:00',end:'14:05',title:'츠쿠바행 공항버스',label:'13시 편 기준 · 약 65분',place:'Tsukuba Center Bus Terminal',detail:'첨부 일정표 기준: T3 13:00 → T2 13:05 → T1 13:10 → 츠쿠바센터 14:05. 다음 후보는 T3 14:00 → T2 14:05 → T1 14:10 → 15:05 도착. 실제 탑승편에 따라 이후 일정은 달라져요.',kind:'bus',url:'https://www.keiseibus.co.jp/express-bus/90123-2/',link:'버스 공식 시간표'},
 {time:'14:05',end:'15:30',title:'츠쿠바 도착 · 짐 정리',label:'숙소 이동 · 여유 시간',place:'Tsukuba Center Bus Terminal',detail:'버스 하차 후 숙소로 이동하고 짐을 정리해요. 시간은 이동과 휴식을 위한 계획 여유예요. 요니 집 상세 주소는 가족용 비상 PDF에서만 확인해요.',kind:'stay'},
 {time:'15:30',end:'18:00',title:'츠쿠바에서 쉬어가기',label:'휴식 · 자유 일정',place:'Tsukuba Expo Center',detail:'컨디션에 맞춰 휴식하거나 주변을 둘러봐요. 엑스포센터는 방문 후보이며 크리스마스 행사와 운영 시간은 확인이 필요해요.',kind:'stay',url:'https://www.expocenter.or.jp/',link:'엑스포센터 공식 홈페이지'},
 {time:'18:00',end:'19:30',title:'요니와 저녁 식사',label:'세 사람 합류 · 식당 미정',place:'Tsukuba Station',detail:'리미 · 티고 · 요니가 만나 저녁을 먹어요. 장소와 시간은 제안이며 확정 전이에요.',kind:'stay'},
];
export const duration = (s:typeof stops[number]) => minutes(s.end)-minutes(s.time);
