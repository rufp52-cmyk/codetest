export interface Album {
  id: string;
  title: string;
  artist: string;
  type: 'Single' | 'EP' | 'Album';
  releaseDate: string;
  coverUrl: string;
  gradient: string;
  tracks: string[];
  description?: string;
}

export interface OnAirShow {
  id: string;
  title: string;
  cast: string;
  type: string;
  releaseDate: string;
  coverUrl: string;
  gradient: string;
  description: string;
}

export interface YoutubeVideo {
  id: string;
  title: string;
  artist: string;
  videoId: string; // youtube id
  thumbnailUrl: string;
}

export interface ScheduleItem {
  id: string;
  date: string;
  dayOfWeek: string;
  artist: string;
  activity: string;
  isToday?: boolean;
}

export const RECENT_RELEASES: Album[] = [
  {
    id: 'love-me',
    title: 'EP <LOVE ME>',
    artist: 'SHOWNU X HYUNGWON',
    type: 'EP',
    releaseDate: '2026년 5월 21일',
    coverUrl: '/image/album/2.PNG',
    gradient: 'from-slate-900 to-indigo-950',
    description: 'Capturing the beating heart of contemporary K-Pop, this space curates the definitive soundtrack of a generation. Every release represents a bold leap forward, blending infectious rhythms and deeply resonant storytelling. From global stadium anthems to intimate tracks, Starship Entertainment continues to push the boundaries of sound, transforming simple melodies into global phenomena.',
    tracks: ['Love Me', 'Roll the Dice', 'Play Me', 'Slow Dance']
  },
  {
    id: 'bloomhour',
    title: '[싱글] 우주소녀 [Bloom hour]',
    artist: 'WJSN',
    type: 'Single',
    releaseDate: '2026년 2월 25일',
    coverUrl: '/image/album/5.PNG',
    gradient: 'from-purple-950 to-pink-950',
    description: '우주소녀의 데뷔 10주년을 장식하는 특별 싱글 [Bloom hour]. 화려하게 피어나는 꽃들처럼 변함없이 빛나는 팬들과의 시간을 봄날의 설렘을 담은 멜로디로 풀어낸 선물 같은 트랙.',
    tracks: ['Bloom hour', '🌸 Bloom hour (Inst.)']
  },
  {
    id: 'revive',
    title: 'THE 2nd ALBUM <REVIVE+>',
    artist: 'IVE',
    type: 'Album',
    releaseDate: '2026년 2월 23일',
    coverUrl: '/image/album/6.PNG',
    gradient: 'from-blue-950 to-emerald-950',
    description: '아이브가 선보이는 미스터리어스하고 당당한 매력의 두 번째 정규 앨범 <REVIVE+>. 더욱 깊어진 보컬과 감각적인 비트로 글로벌 차트를 매료시킬 대작.',
    tracks: ['Revive', 'After LIKE (Remix)', 'Blue Heart', 'I AM (Neo Version)', 'Intro: Oasis']
  },
  {
    id: 'dayoung-single',
    title: '[싱글] 다영 (DAYOUNG) (우주소녀) 피처링',
    artist: 'DAYOUNG',
    type: 'Single',
    releaseDate: '2026년 4월 7일',
    coverUrl: '/image/album/4.PNG',
    gradient: 'from-amber-950 to-red-950',
    description: '상큼하고 발랄한 에너지를 전하는 우주소녀 다영의 매력적인 특별 피처링 싱글.',
    tracks: ['Sweet Spring (Feat. Dayoung)', 'Sweet Spring (Inst.)']
  },
 {
    id: 'dayoung-single', // 
    title: '[EP] Delulu Pack',
    artist: 'KiiiKiii (키키)',
    type: 'EP',
    releaseDate: '2026년',
    coverUrl: '/image/album/7.PNG', // 앨범 이미지 경로 유지
    gradient: 'from-amber-950 to-red-950',
    description: '키키의 두 번째 미니앨범 [Delulu Pack]. 타이틀곡 \'404 (New Era)\'를 비롯하여 "현실은 잠시 내려두고, 원하는 나를 다시 재생하는 시간"을 키키만의 유머와 태도, 상상으로 풀어내며 다채로운 음악적 변신과 확고한 정체성을 담아낸 앨범.',
    tracks: ['404 (New Era)', 'Delulu Pack (Inst.)'] // 공식 트랙 리스트에 맞게 수정하여 사용하세요.
  },
];

export const LATEST_ON_AIR: OnAirShow[] = [
{
    id: 'whenever-possible', // 
    title: '유재석 캠프',
    cast: '이광수',
    type: 'Entertainment',
    releaseDate: '2026년 5월 26일 화요일 공개',
    coverUrl: './image/actor/1-1.PNG', 
    gradient: 'from-green-950 to-emerald-950',
    description: '안녕하세요. 킹콩 by 스타쉽입니다. 배우 이광수가 출연하는 넷플릭스 예능 <유재석 캠프>가 공개됩니다. 많은 관심과 시청 바랍니다. 감사합니다.'
  },
 {
    id: 'dongwook-book', // 
    title: '연극 <렁스>',
    cast: '김경남',
    type: 'Theater',
    releaseDate: '2026년 5월 23일 토요일 첫 공연',
    coverUrl: './image/actor/2-1.PNG', // 
    gradient: 'from-zinc-900 to-stone-950',
    description: '안녕하세요. 킹콩 by 스타쉽입니다. 배우 김경남이 출연하는 연극 <렁스>가 충무아트센터 중극장 블랙에서 첫 공연을 시작합니다. 팬 여러분의 많은 관심과 응원 부탁드립니다. 감사합니다.'
  },
{
    id: 'headwig', // 
    title: '골드랜드',
    cast: '이광수',
    type: 'Drama', // 디즈니+ 오리지널 시리즈에 맞춰 Drama(또는 Series)로 변경했습니다.
    releaseDate: '2026년 4월 29일 수요일 공개',
    coverUrl: './image/actor/3-1.PNG', // .
    gradient: 'from-amber-950 to-orange-950',
    description: '안녕하세요. 킹콩 by 스타쉽입니다. 배우 이광수가 출연하는 디즈니+의 오리지널 시리즈 <골드랜드>가 공개됩니다. 팬 여러분의 많은 관심과 시청 부탁드립니다. 감사합니다.'
  },
{
    id: 'quiet-life', // 
    title: '영화 <짱구>',
    cast: '신승호',
    type: 'Movie',
    releaseDate: '2026년 4월 22일 수요일 개봉',
    coverUrl: './image/actor/4-1.PNG', // 
    gradient: 'from-teal-900 to-slate-950',
    description: '안녕하세요. 킹콩 by 스타쉽입니다. 배우 신승호가 출연하는 영화 <짱구>가 개봉합니다. 전국 극장에서 팬 여러분의 많은 관심과 관람 부탁드립니다. 감사합니다.'
  },
  {
    id: 'quiet-life', // 
    title: '오늘도 매진했습니다',
    cast: '김범',
    type: 'Drama',
    releaseDate: '2026년 4월 22일 수요일 밤 9시 첫 방송',
    coverUrl: './image/actor/5-1.PNG', // 
    gradient: 'from-teal-900 to-slate-950',
    description: '안녕하세요. 킹콩 by 스타쉽입니다. 4월 22일 수요일 밤 9시! 배우 김범이 출연하는 SBS 수목드라마 <오늘도 매진했습니다>가 방송됩니다. 팬 여러분의 많은 관심과 본방 사수 부탁드립니다. 감사합니다.'
  },
{
    id: 'quiet-life', // 
    title: '영화 <살목지>',
    cast: '장다아',
    type: 'Movie',
    releaseDate: '2026년 4월 개봉', 
    coverUrl: './image/actor/6-1.PNG', // 
    gradient: 'from-teal-900 to-slate-950',
    description: '안녕하세요. 킹콩 by 스타쉽입니다. 배우 장다아가 출연하는 영화 <살목지>가 개봉했습니다. 전국 극장에서 만나볼 수 있사오니 여러분들의 많은 관심과 관람 부탁드립니다. 감사합니다.'
  }
];

export const AUDIO_ARCHIVE: Album[] = [
  {
    id: 'archive-bloomhour',
    title: '[싱글] 우주소녀 [Bloom hour]',
    artist: '우주소녀 (WJSN)',
    type: 'Single',
    releaseDate: '2026년 2월 25일',
    coverUrl: '/image/album/5.PNG',
    gradient: 'from-purple-950 to-pink-900',
    tracks: ['Bloom hour', 'Bloom hour (Inst.)']
  },
  {
    id: 'archive-revive',
    title: 'THE 2nd ALBUM <REVIVE+>',
    artist: '아이브 (IVE)',
    type: 'Album',
    releaseDate: '2026년 2월 23일',
    coverUrl: '/image/album/6.PNG',
    gradient: 'from-indigo-950 to-teal-950',
    tracks: ['Revive (Title)', 'After LIKE (Remix)', 'Blue Heart', 'I AM (Neo Version)']
  },
  {
    id: 'archive-dayoung',
    title: '[싱글] 다영 (DAYOUNG) (우주소녀) 피처링',
    artist: '다영 (DAYOUNG)',
    type: 'Single',
    releaseDate: '2026년 4월 7일',
    coverUrl: '/image/album/4.PNG',
    gradient: 'from-amber-950 to-red-950',
    tracks: ['Sweet Spring (Feat. Dayoung)']
  },
  {
    id: 'archive-pushback',
    title: 'IVE 디지털 싱글 [PUSHBACK]',
    artist: '아이브 (IVE)',
    type: 'Single',
    releaseDate: '2025년 11월 20일',
    coverUrl: '/image/album/3.PNG',
    gradient: 'from-rose-950 to-slate-900',
    tracks: ['PUSHBACK']
  },
  {
    id: 'archive-kiki',
    title: 'KIKI [필름루루]',
    artist: 'KIKI',
    type: 'Single',
    releaseDate: '2026년 1월 20일',
    coverUrl: '/image/album/7.PNG',
    gradient: 'from-pink-950 to-stone-900',
    tracks: ['Film Lulu (필름루루)', 'Dear My Friend']
  },
  {
    id: 'archive-loveme',
    title: '[EP] 셔누 X 형원 EP <LOVE ME>',
    artist: '셔누 X 형원',
    type: 'EP',
    releaseDate: '2026년 5월 21일',
    coverUrl: '/image/album/7.PNG',
    gradient: 'from-slate-900 to-indigo-950',
    tracks: ['Love Me', 'Roll the Dice', 'Play Me']
  }
];

export const YOUTUBE_VIDEOS: YoutubeVideo[] = [
  {
    id: 'video-ive-heya',
    title: "아이브 (IVE) '해야 (HEYA)' MV",
    artist: '아이브 (IVE)',
    videoId: 'YLhY7YgLST8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'video-monstax-liar',
    title: "MONSTA X (몬스타엑스) 'Beautiful Liar' MV",
    artist: '몬스타엑스 (MONSTA X)',
    videoId: '-G8S8pTID7w',
    thumbnailUrl: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'video-wjsn-wish',
    title: "우주소녀 (WJSN) '이루어리 (As You Wish)' MV",
    artist: '우주소녀 (WJSN)',
    videoId: '2p8F_A9QZt8',
    thumbnailUrl: 'https://images.unsplash.com/photo-1482440308425-276ad0f28b19?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'video-cravity-love',
    title: "CRAVITY (크래비티) 'Love or Die' MV",
    artist: '크래비티 (CRAVITY)',
    videoId: 'scZ8Lg1vjio',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop'
  }
];

export const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    id: 'sch-1',
    date: '06.05 (금)',
    dayOfWeek: '금',
    artist: '아이브 (IVE)',
    activity: 'MBC 쇼! 음악중심 출연 및 무대'
  },
  {
    id: 'sch-2',
    date: '06.05 (금)',
    dayOfWeek: '금',
    artist: '이광수',
    activity: '넷플릭스 오리지널 예능 제작발표회'
  },
  {
    id: 'sch-3',
    date: '06.06 (토)',
    dayOfWeek: '토',
    artist: '몬스타엑스 (MONSTA X)',
    activity: "자체 웹콘텐츠 '몬채널' 공개"
  },
  {
    id: 'sch-4',
    date: '06.07 (일)',
    dayOfWeek: '일',
    artist: '유연석',
    activity: "뮤지컬 '헤드윅' 서울 공연 (막공)"
  },
  {
    id: 'sch-5',
    date: '06.08 (월)',
    dayOfWeek: '월',
    artist: '크래비티 (CRAVITY)',
    activity: "공식 팬클럽 'LUVITY' 4기 모집 시작"
  },
  {
    id: 'sch-6',
    date: '06.09 (화)',
    dayOfWeek: '화',
    artist: '이동욱',
    activity: '신작 드라마 비하인드 포토북 예약 판매'
  },
  {
    id: 'sch-7',
    date: '06.10 (수)',
    dayOfWeek: '수',
    artist: '우주소녀 (WJSN)',
    activity: "10주년 기념 싱글 'Bloomhour' 스페셜 클립",
    isToday: true
  },
  {
    id: 'sch-8',
    date: '06.11 (목)',
    dayOfWeek: '목',
    artist: '정세운',
    activity: 'SBS 파워FM 라디오 게스트 고정 출연'
  },
  {
    id: 'sch-9',
    date: '06.12 (금)',
    dayOfWeek: '금',
    artist: '안유진 (IVE)',
    activity: 'tvN 새 예능 프로그램 본방사수 (고정)'
  }
];
