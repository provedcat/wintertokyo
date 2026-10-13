export type Stop={time:string;end:string;title:string;label:string;place:string;detail:string;kind:string;url?:string;link?:string;event?:boolean;sourceRow?:number};
export type RoutePoint={name:string;lat:number;lng:number;stop:number;kind:string;region:string};
export type Trip={date:string;title:string;subtitle:string;who:string;stops:Stop[];points:RoutePoint[];notes:string[]};
export const minutes=(time:string)=>{const [h,m]=time.split(':').map(Number);return h*60+m};
export const duration=(s:Stop)=>s.time&&s.end&&!s.event?Math.max(0,minutes(s.end)-minutes(s.time)):0;
export const sourceSheet='https://docs.google.com/spreadsheets/d/1JshvKCWPaMA47oAISWZKQf3pJjKTgB_4GktZpgd18PE/edit';
export const syncedAt='2026-10-13';
export const trips:Trip[]=[
  {
    "date": "2026-12-09",
    "title": "일본에 도착하는 날",
    "subtitle": "남성역 → 인천 → 나리타 → 츠쿠바",
    "who": "리미 · 티고 / 저녁 요니 합류",
    "stops": [
      {
        "time": "05:36",
        "end": "06:50",
        "title": "남성역 → 인천공항",
        "label": "버스 · 남성역",
        "place": "남성역",
        "detail": "남성역 · 버스 탑승. 인천공항제1여객터미널 도착 · 17,000원 · 버스 요금 메모: 17,000원. 출발 정류장과 운행 시간은 탑승 전 확인.",
        "kind": "bus",
        "sourceRow": 6,
        "url": "https://airportlimousine.co.kr/sub/sub01.php?cat_no=25",
        "link": "공식·안내 열기"
      },
      {
        "time": "08:30",
        "end": "11:00",
        "title": "인천 → 나리타",
        "label": "항공 · 인천→나리타",
        "place": "Narita International Airport",
        "detail": "인천→나리타 · 출국·도착 / 도착시간은 항공권 확인 · 한국·일본 시차 없음 / 입국·수하물 여유 확보 · 11:00 도착은 시트의 계획 시각이며 항공권 확인 필요.",
        "kind": "flight",
        "sourceRow": 7
      },
      {
        "time": "11:00",
        "end": "13:00",
        "title": "입국 · 수하물 · 점심",
        "label": "도착 후 여유 · 공항",
        "place": "Narita International Airport",
        "detail": "시트의 공항 점심 메모를 도착 후~버스 출발 사이에 배치했어요. 실제 입국 소요와 버스 탑승편에 따라 조정해요.",
        "kind": "stay",
        "sourceRow": 8
      },
      {
        "time": "13:00",
        "end": "15:30",
        "title": "나리타 → 츠쿠바",
        "label": "버스 · 나리타→츠쿠바",
        "place": "Tsukuba Center Bus Terminal",
        "detail": "나리타→츠쿠바 · 공항버스·숙소 이동 · T3 13:00 또는 14:00 / T2·T1은 5·10분 뒤. 놓치면 16:20편 · 참고 시간표: T3 13:00 → 츠쿠바센터 14:05, T3 14:00 → 15:05. 15:30까지는 시트에 잡힌 이동 여유이며 15:30 택시 일정과 이어져요.",
        "kind": "bus",
        "sourceRow": 9,
        "url": "https://www.keiseibus.co.jp/express-bus/90123-2/",
        "link": "공식·안내 열기"
      },
      {
        "time": "15:30",
        "end": "16:00",
        "title": "숙소로 이동",
        "label": "택시 · 츠쿠바",
        "place": "Tsukuba Center Bus Terminal",
        "detail": "츠쿠바 · 버스터미널에서 요니네집으로 이동 · 요니 집 상세 주소와 연락처는 공개 웹페이지에 표시하지 않아요.",
        "kind": "stay",
        "sourceRow": 10
      },
      {
        "time": "16:00",
        "end": "18:00",
        "title": "휴식 · 카페 · 쇼핑",
        "label": "택시 · 츠쿠바",
        "place": "Tsukuba Expo Center",
        "detail": "츠쿠바 · 휴식, 엑스포, 카페 · 쇼핑몰, 요니 퇴근 후 합류 · 2026 크리스마스 조명 행사 미확인 / 선택 일정 · 16:00~18:00은 시트의 연결된 선택 일정이며 방문 순서는 미정.",
        "kind": "stay",
        "sourceRow": 11
      },
      {
        "time": "18:00",
        "end": "19:30",
        "title": "요니와 저녁 · 휴식",
        "label": "현지 · 츠쿠바",
        "place": "Tsukuba Station",
        "detail": "츠쿠바 · 저녁·휴식 · 식당 미정 / 다음날 일찍 출발",
        "kind": "stay",
        "sourceRow": 13
      }
    ],
    "points": [
      {
        "name": "남성역",
        "lat": 37.4846,
        "lng": 126.9719,
        "stop": 0,
        "kind": "bus",
        "region": "KR"
      },
      {
        "name": "인천공항",
        "lat": 37.4602,
        "lng": 126.4407,
        "stop": 1,
        "kind": "bus",
        "region": "KR"
      },
      {
        "name": "나리타공항",
        "lat": 35.772,
        "lng": 140.3929,
        "stop": 1,
        "kind": "flight",
        "region": "JP"
      },
      {
        "name": "츠쿠바센터",
        "lat": 36.082,
        "lng": 140.1115,
        "stop": 3,
        "kind": "bus",
        "region": "JP"
      }
    ],
    "notes": [
      "항공편 도착·터미널과 실제 공항버스 탑승편을 확인해주세요."
    ]
  },
  {
    "date": "2026-12-10",
    "title": "도쿄 골목과 크리스마스",
    "subtitle": "츠쿠바 → 야나카 · 닛포리 → 쉐라톤 → 시바공원 → 호텔",
    "who": "리미 · 티고 · 요니",
    "stops": [
      {
        "time": "07:00",
        "end": "09:30",
        "title": "츠쿠바 → 닛포리",
        "label": "자차 · 츠쿠바→닛포리",
        "place": "Nippori Station",
        "detail": "츠쿠바→닛포리 · 도쿄 이동·주차 · 도로 정체 포함 약 2.5시간 계획 / 상황 따라 산책 축소",
        "kind": "drive",
        "sourceRow": 15
      },
      {
        "time": "09:30",
        "end": "11:15",
        "title": "야나카 긴자 산책",
        "label": "도보 · 야나카 긴자",
        "place": "Yanaka Ginza",
        "detail": "야나카 긴자 · 골목 산책 · 소품 간식 구매",
        "kind": "walk",
        "sourceRow": 16
      },
      {
        "time": "11:15",
        "end": "12:15",
        "title": "닛포리 점심",
        "label": "도보 · 닛포리",
        "place": "Nippori Station",
        "detail": "닛포리 · 점심 A/B/C 중 1곳 · 옵션 시트 / 혼잡하면 카페 대안",
        "kind": "walk",
        "sourceRow": 17
      },
      {
        "time": "12:15",
        "end": "13:30",
        "title": "쉐라톤으로 이동",
        "label": "자차 · 닛포리→시로카네",
        "place": "Sheraton Miyako Hotel Tokyo",
        "detail": "닛포리→시로카네 · 쉐라톤 미야코 이동 · 주차·교통 버퍼 포함",
        "kind": "drive",
        "sourceRow": 18
      },
      {
        "time": "13:30",
        "end": "15:30",
        "title": "Bamboo 티타임",
        "label": "현지 · 쉐라톤 미야코",
        "place": "Sheraton Miyako Hotel Tokyo",
        "detail": "쉐라톤 미야코 · Bamboo 티타임 · 주차 할인 조건은 호텔 확인 / 3,000엔 이상 4h는 · 시트 메모가 일부만 작성돼 있어 주차 할인은 호텔에 확인 필요.",
        "kind": "stay",
        "sourceRow": 19,
        "url": "https://www.miyakohotels.ne.jp/tokyo/restaurant/bamboo/menu/62780/",
        "link": "공식·안내 열기"
      },
      {
        "time": "15:30",
        "end": "16:00",
        "title": "시바 파크 호텔로 이동",
        "label": "자차 · 시로카네→시바코엔",
        "place": "Shiba Park Hotel",
        "detail": "시로카네→시바코엔 · 시바 파크 호텔 이동 · 교통 버퍼 포함 30분",
        "kind": "drive",
        "sourceRow": 20
      },
      {
        "time": "16:00",
        "end": "16:30",
        "title": "주차 · 체크인",
        "label": "자차 · 시바 파크 호텔",
        "place": "Shiba Park Hotel",
        "detail": "시바 파크 호텔 · 호텔 주차·체크인·짐 정리 · 24시간 주차 2,500엔 / 예약 불가·16대 / 만차 시 대안 문의",
        "kind": "drive",
        "sourceRow": 21,
        "url": "https://www.shibaparkhotel.com/facility/",
        "link": "공식·안내 열기"
      },
      {
        "time": "16:30",
        "end": "17:00",
        "title": "마켓 입구로 이동",
        "label": "도보 · 시바공원",
        "place": "Shiba Park",
        "detail": "시바공원 · 마켓 입구 이동 · 예약 17:00에 맞춰 여유 있게. 티켓 1인 1000엔 · 최종 시간표는 17:00, 참고정보는 16:30으로 달라 실제 티켓 시간 확인 필요.",
        "kind": "walk",
        "sourceRow": 22,
        "url": "https://tokyochristmas.net/shiba/",
        "link": "공식·안내 열기"
      },
      {
        "time": "17:00",
        "end": "20:00",
        "title": "마켓 · 도쿄타워 야경",
        "label": "도보 · 크리스마스마켓",
        "place": "Tokyo Tower",
        "detail": "크리스마스마켓 · 예약 마켓·저녁·도쿄타워 야경 · 성인 3명 저녁 및 쇼핑 · 최종 시간표는 17:00, 참고정보는 16:30으로 달라 실제 티켓 시간 확인 필요.",
        "kind": "walk",
        "sourceRow": 23,
        "url": "https://tokyochristmas.net/shiba/",
        "link": "공식·안내 열기"
      },
      {
        "time": "20:00",
        "end": "20:00",
        "title": "호텔 복귀 · 휴식",
        "label": "도보 · 시바 파크 호텔",
        "place": "Shiba Park Hotel",
        "detail": "시바 파크 호텔 · 호텔 복귀·휴식 · 12/10–11 1박 / 이날 츠쿠바 귀가 없음",
        "kind": "walk",
        "sourceRow": 24,
        "url": "https://www.shibaparkhotel.com/",
        "link": "공식·안내 열기",
        "event": true
      }
    ],
    "points": [
      {
        "name": "츠쿠바센터",
        "lat": 36.082,
        "lng": 140.1115,
        "stop": 0,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "닛포리 · 야나카",
        "lat": 35.7278,
        "lng": 139.7668,
        "stop": 1,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "쉐라톤 미야코",
        "lat": 35.6385,
        "lng": 139.7309,
        "stop": 4,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "시바 파크 호텔",
        "lat": 35.6592,
        "lng": 139.7534,
        "stop": 6,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "시바공원 · 도쿄타워",
        "lat": 35.6586,
        "lng": 139.7454,
        "stop": 8,
        "kind": "walk",
        "region": "JP"
      },
      {
        "name": "시바 파크 호텔",
        "lat": 35.6592,
        "lng": 139.7534,
        "stop": 9,
        "kind": "walk",
        "region": "JP"
      }
    ],
    "notes": [
      "마켓 입장은 최종 시간표의 17:00 기준. 참고정보의 16:30과 달라 티켓 확인이 필요해요.",
      "12/10~11 호텔 1박. 이날 츠쿠바로 돌아가지 않아요."
    ]
  },
  {
    "date": "2026-12-11",
    "title": "긴자와 마루노우치",
    "subtitle": "호텔 → 긴자 → 호텔 출차 → 마루노우치 → 츠쿠바",
    "who": "리미 · 티고 · 요니",
    "stops": [
      {
        "time": "09:30",
        "end": "09:30",
        "title": "체크아웃 · 짐 정리",
        "label": "현지 · 호텔",
        "place": "Shiba Park Hotel",
        "detail": "호텔 · 체크아웃 / 짐 보관은 차에 · 차는 호텔에 두고 이동. 체크아웃 후 주차·보관 조건 확인 · 시작 시각은 미정, 09:30까지 체크아웃 계획.",
        "kind": "stay",
        "sourceRow": 26,
        "url": "https://www.shibaparkhotel.com/facility/",
        "link": "공식·안내 열기",
        "event": true
      },
      {
        "time": "09:30",
        "end": "10:00",
        "title": "호텔 → 긴자",
        "label": "대중교통 · 호텔→긴자",
        "place": "Higashi-ginza Station",
        "detail": "호텔→긴자 · 다이몬역-하가사긴자역 · 도보 + 지하철 약 25~30분 예상 · 시트의 역 표기는 외부 지도로 확인해요.",
        "kind": "transit",
        "sourceRow": 27
      },
      {
        "time": "10:00",
        "end": "11:00",
        "title": "GLITCH GINZA 커피",
        "label": "도보 · 긴자",
        "place": "GLITCH COFFEE GINZA",
        "detail": "긴자 · Glitch GINZA 커피 · 모닝 커피",
        "kind": "walk",
        "sourceRow": 28,
        "url": "https://tabelog.com/tokyo/A1301/A130101/13283362/",
        "link": "공식·안내 열기"
      },
      {
        "time": "11:00",
        "end": "12:30",
        "title": "미쓰코시 지하 식품관",
        "label": "도보 · 긴자",
        "place": "Ginza Mitsukoshi",
        "detail": "긴자 · 긴자 미쓰코시 지하 식품관 · 프레데릭 카셀, 장폴에방",
        "kind": "walk",
        "sourceRow": 29
      },
      {
        "time": "12:30",
        "end": "14:00",
        "title": "긴자 점심",
        "label": "도보 · 긴자 점심",
        "place": "Ginza",
        "detail": "긴자 점심 · 미정 · 참고 후보: 긴자 마루 / Gyū-an / 미노루 식당. 식당 선택은 아직 미정.",
        "kind": "walk",
        "sourceRow": 30
      },
      {
        "time": "14:00",
        "end": "14:45",
        "title": "긴자 → 호텔 · 출차",
        "label": "대중교통 · 긴자→호텔",
        "place": "Shiba Park Hotel",
        "detail": "긴자→호텔 · 하가사긴자역-다이몬역, 출차 시간 포함 · 출차 시간 포함 45분. 전날 16:00경 입차 기준 · 시트의 역 표기는 외부 지도로 확인해요.",
        "kind": "transit",
        "sourceRow": 31,
        "url": "https://www.shibaparkhotel.com/facility/",
        "link": "공식·안내 열기"
      },
      {
        "time": "14:45",
        "end": "15:30",
        "title": "호텔 → 마루노우치",
        "label": "자차 · 호텔→마루노우치",
        "place": "Marunouchi Park Building",
        "detail": "호텔→마루노우치 · 마루노우치 파크인 · 금요일 저녁  주차·교통 버퍼 포함",
        "kind": "drive",
        "sourceRow": 32
      },
      {
        "time": "15:30",
        "end": "18:15",
        "title": "트리 · 일루미네이션 · 저녁",
        "label": "도보 · 마루노우치 저녁",
        "place": "Marunouchi Naka-dori",
        "detail": "마루노우치 저녁 · 해리포터 트리·일루미네이션, 저녁식사 · 점등·쇼 시간 10월 하순 발표 확인 / 16시 도착·18시까지 확보",
        "kind": "walk",
        "sourceRow": 33,
        "url": "https://www.marunouchi.com/pickup/event/10727/",
        "link": "공식·안내 열기"
      },
      {
        "time": "18:15",
        "end": "20:00",
        "title": "마루노우치 → 츠쿠바",
        "label": "자차 · 마루노우치→츠쿠바",
        "place": "Tsukuba Station",
        "detail": "마루노우치→츠쿠바 · 금요일 저녁 정체 감안 1시간 45분 예상. \n늦어지면 20:30 전후 도착 가능 · 주차장 제휴 점포 6,000엔 이상 이용 시 최대 2시간 할인",
        "kind": "drive",
        "sourceRow": 34,
        "url": "https://www.marunouchi.com/ko/information/parking/",
        "link": "공식·안내 열기"
      }
    ],
    "points": [
      {
        "name": "시바 파크 호텔",
        "lat": 35.6592,
        "lng": 139.7534,
        "stop": 0,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "긴자",
        "lat": 35.6694,
        "lng": 139.767,
        "stop": 2,
        "kind": "transit",
        "region": "JP"
      },
      {
        "name": "시바 파크 호텔",
        "lat": 35.6592,
        "lng": 139.7534,
        "stop": 5,
        "kind": "transit",
        "region": "JP"
      },
      {
        "name": "마루노우치",
        "lat": 35.6795,
        "lng": 139.7632,
        "stop": 7,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "츠쿠바센터",
        "lat": 36.082,
        "lng": 140.1115,
        "stop": 8,
        "kind": "drive",
        "region": "JP"
      }
    ],
    "notes": [
      "차와 짐은 호텔에 두고 긴자로 이동해요. 14:00 호텔 복귀 후 출차해요.",
      "금요일 저녁 정체로 츠쿠바 도착이 20:30 전후로 늦어질 수 있어요."
    ]
  },
  {
    "date": "2026-12-12",
    "title": "수영과 겨울 정원",
    "subtitle": "도호공원 → 츠쿠바 · 플리마켓 → 플라워파크 → 츠쿠바",
    "who": "리미 · 티고 · 요니",
    "stops": [
      {
        "time": "08:30",
        "end": "09:30",
        "title": "아침 · 수영 준비",
        "label": "현지 · 츠쿠바",
        "place": "Tsukuba Station",
        "detail": "츠쿠바 · 아침·수영 준비 · 수영장 겨울 운영시간 확인",
        "kind": "stay",
        "sourceRow": 37
      },
      {
        "time": "10:00",
        "end": "11:30",
        "title": "도호공원 수영",
        "label": "도보 · 도호공원",
        "place": "Doho Park",
        "detail": "도호공원 · 수영 · 2시간 성인 370엔 / 운영·휴관 확인",
        "kind": "walk",
        "sourceRow": 39,
        "url": "https://www.doho-park.com/guide/",
        "link": "공식·안내 열기"
      },
      {
        "time": "12:00",
        "end": "13:00",
        "title": "츠쿠바 점심",
        "label": "현지 · 츠쿠바",
        "place": "Tsukuba Station",
        "detail": "츠쿠바 · 점심 · 식당 미정",
        "kind": "stay",
        "sourceRow": 40
      },
      {
        "time": "13:00",
        "end": "15:00",
        "title": "커피 · 휴식 · 플리마켓",
        "label": "현지 · 츠쿠바",
        "place": "Tonarie Tsukuba Square",
        "detail": "츠쿠바 · 커피·휴식 · 토나리에 쓰쿠바 스퀘어 플리마켓 선택 · トナリエつくばスクエア前2階ペデストリアンデッキ広場\n〒305-0031 茨城県つくば市吾妻１−６−１ · 13:00~15:00 안에서 휴식 또는 플리마켓을 선택해요.",
        "kind": "stay",
        "sourceRow": 41,
        "url": "https://ikinamarket.com/tsukunomi/",
        "link": "공식·안내 열기"
      },
      {
        "time": "15:15",
        "end": "16:00",
        "title": "플라워파크로 이동",
        "label": "자차 · 츠쿠바→플라워파크",
        "place": "Ibaraki Flower Park",
        "detail": "츠쿠바→플라워파크 · 이동·입장 · 성인 1,200엔 / 12월 토요일 혼잡 대비",
        "kind": "drive",
        "sourceRow": 43,
        "url": "https://www.flowerpark.or.jp/news-column/moonlight2026/",
        "link": "공식·안내 열기"
      },
      {
        "time": "16:00",
        "end": "17:30",
        "title": "정원 · 겨울 마르쉐",
        "label": "도보 · 플라워파크",
        "place": "Ibaraki Flower Park",
        "detail": "플라워파크 · 정원 / 겨울 마르쉐 선택 · ~ March é  de Noel ~ 장소 : 가시꽃 꽃 공원, 로즈 팜 및 레스토랑 주변",
        "kind": "walk",
        "sourceRow": 44,
        "url": "https://hitachinokunino3.webnode.jp/%E3%82%86%E3%81%84/?utm_source=chatgpt.com",
        "link": "공식·안내 열기"
      },
      {
        "time": "17:30",
        "end": "19:30",
        "title": "Moonlight Rose Garden · 저녁",
        "label": "도보 · 플라워파크",
        "place": "Ibaraki Flower Park",
        "detail": "플라워파크 · Moonlight Rose Garden·저녁 · 공식 점등 17:00–20:30 / 따뜻한 옷 준비",
        "kind": "walk",
        "sourceRow": 45
      },
      {
        "time": "19:30",
        "end": "20:30",
        "title": "츠쿠바 복귀",
        "label": "자차 · 플라워파크→츠쿠바",
        "place": "Tsukuba Station",
        "detail": "플라워파크→츠쿠바 · 복귀 · 마감 전 여유 있게 출발",
        "kind": "drive",
        "sourceRow": 46
      }
    ],
    "points": [
      {
        "name": "도호공원",
        "lat": 36.0588,
        "lng": 140.1229,
        "stop": 1,
        "kind": "walk",
        "region": "JP"
      },
      {
        "name": "츠쿠바 · 토나리에",
        "lat": 36.082,
        "lng": 140.1115,
        "stop": 3,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "이바라키 플라워파크",
        "lat": 36.2414,
        "lng": 140.1705,
        "stop": 4,
        "kind": "drive",
        "region": "JP"
      },
      {
        "name": "츠쿠바센터",
        "lat": 36.082,
        "lng": 140.1115,
        "stop": 7,
        "kind": "drive",
        "region": "JP"
      }
    ],
    "notes": [
      "수영장 운영과 행사는 방문 전 확인이 필요해요. 식당은 미정이에요."
    ]
  },
  {
    "date": "2026-12-13",
    "title": "인천으로 돌아가는 날",
    "subtitle": "츠쿠바 → 나리타 19:00 출발 → 인천 도착",
    "who": "리미 · 티고 / 요니 배웅",
    "stops": [
      {
        "time": "09:00",
        "end": "11:30",
        "title": "아침 · 교회",
        "label": "자차 · 츠쿠바",
        "place": "Tsukuba Station",
        "detail": "츠쿠바 · 아침·교회 · 교회 시간 미정 / 실제 예배 시간에 맞춰 조정",
        "kind": "drive",
        "sourceRow": 49
      },
      {
        "time": "12:00",
        "end": "14:30",
        "title": "점심 · 짐 정리",
        "label": "자차 · 츠쿠바",
        "place": "Tsukuba Station",
        "detail": "츠쿠바 · 점심·짐 정리 · 버스 정류장으로 15시까지 이동",
        "kind": "drive",
        "sourceRow": 50
      },
      {
        "time": "15:20",
        "end": "16:20",
        "title": "츠쿠바 → 나리타",
        "label": "버스 · 츠쿠바→나리타",
        "place": "Narita International Airport",
        "detail": "츠쿠바→나리타 · 공항버스 · T3 16:12 / T2 16:15 / T1 16:20 현재 시간표. 재확인",
        "kind": "bus",
        "sourceRow": 51,
        "url": "https://www.keiseibus.co.jp/express-bus/90123-2/",
        "link": "공식·안내 열기"
      },
      {
        "time": "16:20",
        "end": "19:00",
        "title": "체크인 · 보안 검사",
        "label": "항공 · 나리타",
        "place": "Narita International Airport",
        "detail": "나리타 · 체크인·보안·19시 출국 · 항공편·터미널 확인 / 출발 약 2시간40분 전 도착 계획 · 19:00 나리타 출발. 인천 도착 시각은 시트에 없어 항공권 확인 필요.",
        "kind": "stay",
        "sourceRow": 52
      },
      {
        "time": "19:00",
        "end": "",
        "title": "나리타 출발",
        "label": "항공 · 귀국",
        "place": "Narita International Airport",
        "detail": "시트의 귀국편 출발 계획은 19:00이에요. 항공편 번호와 실제 운항시각은 항공권으로 확인해요.",
        "kind": "flight",
        "event": true
      },
      {
        "time": "",
        "end": "",
        "title": "인천공항 도착",
        "label": "도착 시각 확인 필요",
        "place": "Incheon International Airport",
        "detail": "구글 시트에 인천 도착 시각이 아직 없어요. 항공권에서 확인한 시각을 알려주면 반영할게요. 도착 후 입국 심사·수하물 수령과 귀가 시간을 별도로 확보해요.",
        "kind": "stay",
        "event": true
      }
    ],
    "points": [
      {
        "name": "츠쿠바센터",
        "lat": 36.082,
        "lng": 140.1115,
        "stop": 2,
        "kind": "bus",
        "region": "JP"
      },
      {
        "name": "나리타공항",
        "lat": 35.772,
        "lng": 140.3929,
        "stop": 3,
        "kind": "bus",
        "region": "JP"
      },
      {
        "name": "인천공항",
        "lat": 37.4602,
        "lng": 126.4407,
        "stop": 5,
        "kind": "flight",
        "region": "KR"
      }
    ],
    "notes": [
      "교회 실제 예배 시간·항공편 터미널·인천 도착 시각 확인이 필요해요."
    ]
  }
];
