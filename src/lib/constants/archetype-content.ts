/**
 * XLOV Experience - Archetype별 콘텐츠
 * 7개 아키타입별 강점/약점, 추천 플레이리스트, 장소, 활동, 콘텐츠, 음식, 선물
 */

export interface StrengthItem {
  icon: string
  title: string
  description: string
}

export interface WeaknessItem {
  icon: string
  title: string
  tip: string
}

export interface Song {
  title: string
  artist: string
  genre: string
  mood: string
}

export interface Place {
  type: string
  vibe: string[]
  reason: string
}

export interface Activity {
  name: string
  icon: string
  difficulty: 'easy' | 'medium' | 'hard'
  social: 'solo' | 'small' | 'large'
  energy: 'calm' | 'moderate' | 'high'
}

export interface ContentRec {
  movies: string[]
  books: string[]
  youtubeTypes: string[]
}

export interface FoodRec {
  cuisines: string[]
  cafeVibes: string[]
}

export interface Gift {
  item: string
  icon: string
  reason: string
}

export interface ArchetypeContent {
  strengths: StrengthItem[]
  weaknesses: WeaknessItem[]
  playlist: Song[]
  places: Place[]
  activities: Activity[]
  content: ContentRec
  food: FoodRec
  gifts: Gift[]
}

type ArchetypeKey =
  | 'quiet_mist'
  | 'warm_mist'
  | 'blazing_lava'
  | 'quiet_ice'
  | 'sparkling_wave'
  | 'balanced_rainbow'
  | 'default'

/** 아키타입별 콘텐츠 */
export const ARCHETYPE_CONTENT: Record<ArchetypeKey, ArchetypeContent> = {
  // ========================================
  // 고요한 안개 (Quiet Mist)
  // 달 + 이슬 + 물 + 새벽
  // ========================================
  quiet_mist: {
    strengths: [
      {
        icon: '🎧',
        title: '깊이 있는 사고력',
        description: '혼자만의 시간에 깊게 생각하고 통찰력을 얻어요',
      },
      {
        icon: '🤝',
        title: '진심 어린 공감',
        description: '소수와 깊은 관계를 맺고 진심으로 이해해줘요',
      },
      {
        icon: '🧘',
        title: '차분한 에너지',
        description: '급하지 않고 여유롭게 상황을 관찰하고 대응해요',
      },
    ],
    weaknesses: [
      {
        icon: '😰',
        title: '사람 많은 곳 어색함',
        tip: '소규모 모임부터 시작해보세요! 천천히 확장하면 돼요',
      },
      {
        icon: '⏱️',
        title: '빠른 결정 어려움',
        tip: '급한 상황엔 작은 것부터 빠르게 결정 연습해봐요',
      },
    ],
    playlist: [
      { title: 'Night Changes', artist: 'One Direction', genre: 'Pop', mood: '감성적' },
      { title: 'The Night We Met', artist: 'Lord Huron', genre: 'Indie', mood: '잔잔한' },
      { title: 'Lost Stars', artist: 'Adam Levine', genre: 'Ballad', mood: '몽환적' },
      { title: 'Skinny Love', artist: 'Bon Iver', genre: 'Folk', mood: '차분한' },
      { title: 'Holocene', artist: 'Bon Iver', genre: 'Indie', mood: '사색적' },
      { title: 'To Build a Home', artist: 'The Cinematic Orchestra', genre: 'Orchestral', mood: '깊은' },
    ],
    places: [
      { type: '조용한 서점 카페', vibe: ['조용함', '아늑함', '책'], reason: '혼자만의 시간을 즐기기 완벽해요' },
      { type: '새벽 산책로', vibe: ['고요함', '자연', '여유'], reason: '사람 없는 시간에 생각 정리하기 좋아요' },
      { type: '작은 갤러리', vibe: ['차분함', '예술', '사색'], reason: '혼자 천천히 감상하며 힐링할 수 있어요' },
      { type: '호숫가 벤치', vibe: ['평온함', '자연', '혼자'], reason: '물 보며 멍때리기 최고의 장소' },
    ],
    activities: [
      { name: '독서', icon: '📚', difficulty: 'easy', social: 'solo', energy: 'calm' },
      { name: '일기 쓰기', icon: '✍️', difficulty: 'easy', social: 'solo', energy: 'calm' },
      { name: '명상/요가', icon: '🧘', difficulty: 'medium', social: 'solo', energy: 'calm' },
      { name: '그림 그리기', icon: '🎨', difficulty: 'medium', social: 'solo', energy: 'calm' },
      { name: '악기 연주', icon: '🎸', difficulty: 'hard', social: 'solo', energy: 'moderate' },
      { name: '사진 촬영', icon: '📷', difficulty: 'medium', social: 'solo', energy: 'moderate' },
    ],
    content: {
      movies: ['비포 선라이즈', '로스트 인 트랜슬레이션', '문라이트', '비포 미드나잇'],
      books: ['시집', '에세이', '철학서', '자기계발'],
      youtubeTypes: ['ASMR', '북튜버', '힐링 브이로그', '사색 콘텐츠'],
    },
    food: {
      cuisines: ['차 한잔', '디저트', '비건 음식', '수프'],
      cafeVibes: ['조용한 독서실 카페', '숨은 골목 카페', '북카페'],
    },
    gifts: [
      { item: '향초', icon: '🕯️', reason: '혼자만의 시간을 더 특별하게' },
      { item: '다이어리', icon: '📔', reason: '깊은 생각 기록하기 좋아요' },
      { item: '무선 이어폰', icon: '🎧', reason: '나만의 공간 만들기 필수템' },
      { item: '좋은 책', icon: '📖', reason: '사색의 시간 선물' },
      { item: '편안한 잠옷', icon: '👘', reason: '집에서 힐링 타임' },
    ],
  },

  // ========================================
  // 따스한 안개 (Warm Mist)
  // 달 + 불꽃 + 물 + 새벽
  // ========================================
  warm_mist: {
    strengths: [
      {
        icon: '💕',
        title: '따뜻한 공감 능력',
        description: '조용하지만 마음이 따뜻해서 진심으로 위로해줘요',
      },
      {
        icon: '🎨',
        title: '감성적 표현력',
        description: '내면의 감정을 창의적으로 표현하는 재능이 있어요',
      },
      {
        icon: '🌊',
        title: '유연한 적응력',
        description: '상황에 맞춰 부드럽게 흐르며 적응해요',
      },
    ],
    weaknesses: [
      {
        icon: '😢',
        title: '감정에 쉽게 휘둘림',
        tip: '감정 일기를 써보세요! 객관화하는 연습이 도움돼요',
      },
      {
        icon: '🙊',
        title: '표현은 하는데 사람은 피곤',
        tip: '소수 친구와 깊은 만남이 에너지 덜 소모돼요',
      },
    ],
    playlist: [
      { title: 'Someone Like You', artist: 'Adele', genre: 'Ballad', mood: '감성' },
      { title: 'Let It Be', artist: 'The Beatles', genre: 'Classic Rock', mood: '따뜻한' },
      { title: 'Fix You', artist: 'Coldplay', genre: 'Alternative', mood: '위로' },
      { title: 'Lovely', artist: 'Billie Eilish & Khalid', genre: 'Pop', mood: '몽환적' },
      { title: 'The Scientist', artist: 'Coldplay', genre: 'Alternative', mood: '감성적' },
      { title: 'Gravity', artist: 'Sara Bareilles', genre: 'Pop', mood: '차분한' },
    ],
    places: [
      { type: '아늑한 카페', vibe: ['따뜻함', '소규모', '친밀함'], reason: '소수 친구와 깊은 대화하기 좋아요' },
      { type: '작은 공연장', vibe: ['감성', '예술', '소규모'], reason: '음악 감상하며 감정 충전' },
      { type: '핸드메이드 공방', vibe: ['창작', '따뜻함', '소규모'], reason: '혼자 또는 친한 친구와 만들기 활동' },
      { type: '새벽 해변', vibe: ['고요함', '자연', '감성'], reason: '혼자 또는 둘이서 조용히 사색' },
    ],
    activities: [
      { name: '글쓰기', icon: '✍️', difficulty: 'medium', social: 'solo', energy: 'calm' },
      { name: '영화 감상', icon: '🎬', difficulty: 'easy', social: 'small', energy: 'calm' },
      { name: '공예/만들기', icon: '🧶', difficulty: 'medium', social: 'solo', energy: 'moderate' },
      { name: '음악 감상', icon: '🎵', difficulty: 'easy', social: 'solo', energy: 'calm' },
      { name: '베이킹', icon: '🍰', difficulty: 'medium', social: 'small', energy: 'moderate' },
      { name: '그림 그리기', icon: '🎨', difficulty: 'medium', social: 'solo', energy: 'calm' },
    ],
    content: {
      movies: ['라라랜드', '어바웃 타임', '비긴 어게인', '리틀 포레스트'],
      books: ['에세이', '감성 소설', '시집', '자전적 에세이'],
      youtubeTypes: ['감성 브이로그', '북튜버', '힐링 음악', '요리 ASMR'],
    },
    food: {
      cuisines: ['홈메이드 요리', '따뜻한 수프', '베이커리', '브런치'],
      cafeVibes: ['아늑한 작은 카페', '홈카페', '감성 카페'],
    },
    gifts: [
      { item: '핸드크림 세트', icon: '🧴', reason: '작은 위로와 따뜻함' },
      { item: '감성 소품', icon: '🕯️', reason: '공간을 따뜻하게 만들어줘요' },
      { item: '좋은 노트', icon: '📓', reason: '감정 기록하기 좋아요' },
      { item: '블랭킷', icon: '🧶', reason: '포근함이 필요한 순간' },
      { item: '아로마 디퓨저', icon: '💐', reason: '감성 충전 필수템' },
    ],
  },

  // ========================================
  // 빛나는 용암 (Blazing Lava)
  // 태양 + 불꽃 + 바위 + 황혼
  // ========================================
  blazing_lava: {
    strengths: [
      {
        icon: '⚡',
        title: '뜨거운 열정과 에너지',
        description: '목표를 향해 폭발적으로 달려가는 추진력이 있어요',
      },
      {
        icon: '👥',
        title: '강력한 리더십',
        description: '사람들을 이끌고 영향력을 발휘하는 카리스마가 있어요',
      },
      {
        icon: '🎯',
        title: '확고한 신념',
        description: '한번 결정하면 끝까지 밀고 나가는 강한 의지가 있어요',
      },
    ],
    weaknesses: [
      {
        icon: '🔥',
        title: '감정 폭발 주의',
        tip: '심호흡하고 10초만 기다려보세요! 차분해질 거예요',
      },
      {
        icon: '😤',
        title: '고집이 세서 충돌',
        tip: '다른 의견도 들어보기! 유연함도 강점이 될 수 있어요',
      },
    ],
    playlist: [
      { title: 'Eye of the Tiger', artist: 'Survivor', genre: 'Rock', mood: '투지' },
      { title: 'Thunder', artist: 'Imagine Dragons', genre: 'Alternative', mood: '강렬' },
      { title: 'Don\'t Stop Me Now', artist: 'Queen', genre: 'Rock', mood: '흥분' },
      { title: 'Believer', artist: 'Imagine Dragons', genre: 'Alternative', mood: '열정' },
      { title: 'Roar', artist: 'Katy Perry', genre: 'Pop', mood: '파워풀' },
      { title: 'We Will Rock You', artist: 'Queen', genre: 'Rock', mood: '강렬' },
      { title: 'Stronger', artist: 'Kanye West', genre: 'Hip-Hop', mood: '자신감' },
    ],
    places: [
      { type: '클럽/페스티벌', vibe: ['시끌벅적', '에너지 넘침', '대규모'], reason: '폭발적인 에너지 발산하기 최고!' },
      { type: '스포츠 바', vibe: ['활기참', '경쟁', '사교'], reason: '뜨거운 응원과 사람들과의 교류' },
      { type: '익스트림 스포츠장', vibe: ['스릴', '도전', '역동'], reason: '아드레날린 폭발! 도전 정신 만족' },
      { type: '네트워킹 파티', vibe: ['활발함', '소셜', '에너지'], reason: '사람들과 적극적으로 교류' },
    ],
    activities: [
      { name: '고강도 운동', icon: '🏋️', difficulty: 'hard', social: 'small', energy: 'high' },
      { name: '팀 스포츠', icon: '⚽', difficulty: 'medium', social: 'large', energy: 'high' },
      { name: '파티 기획', icon: '🎉', difficulty: 'medium', social: 'large', energy: 'high' },
      { name: '댄스/춤', icon: '💃', difficulty: 'medium', social: 'large', energy: 'high' },
      { name: '클럽 활동', icon: '🎵', difficulty: 'easy', social: 'large', energy: 'high' },
      { name: '프레젠테이션', icon: '🎤', difficulty: 'hard', social: 'large', energy: 'high' },
      { name: '사업/프로젝트', icon: '💼', difficulty: 'hard', social: 'large', energy: 'high' },
    ],
    content: {
      movies: ['매드맥스', '어벤져스', '인터스텔라', '인셉션', '다크나이트'],
      books: ['비즈니스서', '자서전', '모험 소설', '스릴러'],
      youtubeTypes: ['동기부여', '운동 루틴', '사업 멘토링', '엑션 리뷰'],
    },
    food: {
      cuisines: ['매운 음식', '고기', '파워 푸드', '에너지 드링크'],
      cafeVibes: ['활기찬 루프탑 바', '스포츠 바', '북적이는 핫플'],
    },
    gifts: [
      { item: '스포츠 용품', icon: '🏃', reason: '에너지 발산 필수템' },
      { item: '자기계발서', icon: '📚', reason: '더 강해지고 싶은 욕구' },
      { item: '무선 스피커', icon: '🔊', reason: '파티 분위기 메이커' },
      { item: '스마트워치', icon: '⌚', reason: '운동 기록과 목표 달성' },
      { item: '고급 헤드폰', icon: '🎧', reason: '강렬한 음악 즐기기' },
    ],
  },

  // ========================================
  // 고요한 얼음 (Quiet Ice)
  // 달 + 이슬 + 바위 + 새벽
  // ========================================
  quiet_ice: {
    strengths: [
      {
        icon: '🧊',
        title: '냉철한 판단력',
        description: '감정에 흔들리지 않고 이성적으로 분석해요',
      },
      {
        icon: '🎯',
        title: '강한 집중력',
        description: '혼자 깊이 파고들어 전문성을 쌓아요',
      },
      {
        icon: '🛡️',
        title: '확고한 원칙',
        description: '자신만의 기준이 명확하고 흔들리지 않아요',
      },
    ],
    weaknesses: [
      {
        icon: '❄️',
        title: '차가워 보여요',
        tip: '가끔은 미소와 짧은 공감 한마디! 사람들이 좋아해요',
      },
      {
        icon: '🚧',
        title: '마음 열기 어려움',
        tip: '신뢰하는 사람 한두 명이면 충분해요. 무리하지 마세요',
      },
    ],
    playlist: [
      { title: 'Comfortably Numb', artist: 'Pink Floyd', genre: 'Progressive Rock', mood: '차분한' },
      { title: 'Mad World', artist: 'Gary Jules', genre: 'Alternative', mood: '차가운' },
      { title: 'Fade to Black', artist: 'Metallica', genre: 'Metal', mood: '깊은' },
      { title: 'Hurt', artist: 'Johnny Cash', genre: 'Country', mood: '고독한' },
      { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', genre: 'Folk', mood: '고요한' },
      { title: 'Enjoy the Silence', artist: 'Depeche Mode', genre: 'Electronic', mood: '차분한' },
    ],
    places: [
      { type: '도서관', vibe: ['조용함', '집중', '혼자'], reason: '완벽한 집중 환경' },
      { type: '심야 카페', vibe: ['고요함', '단독', '사색'], reason: '사람 없는 시간, 완벽한 고독' },
      { type: '산 정상', vibe: ['고독', '자연', '사색'], reason: '혼자만의 시간과 생각' },
      { type: '홈 오피스', vibe: ['집중', '효율', '혼자'], reason: '방해 없이 작업하기 최고' },
    ],
    activities: [
      { name: '연구/공부', icon: '📖', difficulty: 'hard', social: 'solo', energy: 'moderate' },
      { name: '프로그래밍', icon: '💻', difficulty: 'hard', social: 'solo', energy: 'moderate' },
      { name: '체스/전략 게임', icon: '♟️', difficulty: 'hard', social: 'solo', energy: 'calm' },
      { name: '명상', icon: '🧘', difficulty: 'medium', social: 'solo', energy: 'calm' },
      { name: '독서', icon: '📚', difficulty: 'easy', social: 'solo', energy: 'calm' },
      { name: '등산', icon: '⛰️', difficulty: 'medium', social: 'solo', energy: 'moderate' },
    ],
    content: {
      movies: ['2001 스페이스 오디세이', '블레이드 러너', '인터스텔라', '매트릭스'],
      books: ['과학서', '철학서', '논픽션', '전략서'],
      youtubeTypes: ['다큐멘터리', '강의', '과학 채널', '전략 게임'],
    },
    food: {
      cuisines: ['커피', '미니멀 식사', '건강식', '차'],
      cafeVibes: ['조용한 스터디 카페', '24시 카페', '혼자만의 공간'],
    },
    gifts: [
      { item: '전문서적', icon: '📚', reason: '지식 확장에 최고' },
      { item: '노이즈 캔슬링 헤드폰', icon: '🎧', reason: '완벽한 집중 환경' },
      { item: '스탠딩 데스크', icon: '🖥️', reason: '효율적인 작업 환경' },
      { item: '고급 만년필', icon: '🖊️', reason: '생각 정리의 도구' },
      { item: '아이패드/태블릿', icon: '📱', reason: '노트 정리와 독서' },
    ],
  },

  // ========================================
  // 반짝이는 파도 (Sparkling Wave)
  // 태양 + 이슬 + 물 + 황혼
  // ========================================
  sparkling_wave: {
    strengths: [
      {
        icon: '✨',
        title: '밝고 긍정적인 에너지',
        description: '어디서든 분위기를 밝게 만드는 매력이 있어요',
      },
      {
        icon: '🌊',
        title: '자유로운 영혼',
        description: '유연하게 흐르며 새로운 경험을 즐겨요',
      },
      {
        icon: '🚀',
        title: '빠른 적응력',
        description: '변화를 두려워하지 않고 빠르게 적응해요',
      },
    ],
    weaknesses: [
      {
        icon: '🌪️',
        title: '집중력 부족',
        tip: '한 번에 하나씩! 타이머 맞춰서 집중 연습해보세요',
      },
      {
        icon: '😅',
        title: '깊이보다 넓이',
        tip: '가끔은 한 가지를 깊게 파보세요. 새로운 발견이 있을 거예요',
      },
    ],
    playlist: [
      { title: 'Good Vibrations', artist: 'The Beach Boys', genre: 'Pop', mood: '경쾌한' },
      { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', genre: 'Pop', mood: '밝은' },
      { title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake', genre: 'Pop', mood: '신나는' },
      { title: 'Happy', artist: 'Pharrell Williams', genre: 'Pop', mood: '행복한' },
      { title: 'Best Day of My Life', artist: 'American Authors', genre: 'Indie Pop', mood: '긍정적' },
      { title: 'On Top of the World', artist: 'Imagine Dragons', genre: 'Alternative', mood: '상쾌한' },
      { title: 'I Gotta Feeling', artist: 'Black Eyed Peas', genre: 'Pop', mood: '흥겨운' },
    ],
    places: [
      { type: '해변', vibe: ['자유로움', '밝음', '활기'], reason: '파도처럼 자유롭게 놀기 좋아요' },
      { type: '플리마켓', vibe: ['다양함', '신기함', '사교'], reason: '새로운 발견과 사람들 구경' },
      { type: '테마파크', vibe: ['흥분', '재미', '활기'], reason: '모험과 재미가 가득!' },
      { type: '팝업스토어 거리', vibe: ['트렌디', '새로움', '활발'], reason: '계속 바뀌는 새로운 경험' },
    ],
    activities: [
      { name: '여행', icon: '✈️', difficulty: 'medium', social: 'small', energy: 'high' },
      { name: '서핑/수상스포츠', icon: '🏄', difficulty: 'medium', social: 'small', energy: 'high' },
      { name: '파티/모임', icon: '🎉', difficulty: 'easy', social: 'large', energy: 'high' },
      { name: '새로운 취미 시도', icon: '🎨', difficulty: 'easy', social: 'small', energy: 'moderate' },
      { name: '자전거 라이딩', icon: '🚴', difficulty: 'easy', social: 'small', energy: 'moderate' },
      { name: '맛집 탐방', icon: '🍽️', difficulty: 'easy', social: 'small', energy: 'moderate' },
      { name: '소셜 댄스', icon: '💃', difficulty: 'medium', social: 'large', energy: 'high' },
    ],
    content: {
      movies: ['라라랜드', '미드나잇 인 파리', '비포 선라이즈', '어바웃 타임'],
      books: ['여행 에세이', '가벼운 소설', '자기계발', '트렌드 매거진'],
      youtubeTypes: ['여행 브이로그', '먹방', '챌린지', '트렌드 리뷰'],
    },
    food: {
      cuisines: ['이국적 음식', '퓨전 요리', '길거리 음식', '신메뉴'],
      cafeVibes: ['루프탑 카페', '핫플 카페', '오션뷰 카페'],
    },
    gifts: [
      { item: '여행 가방', icon: '🧳', reason: '새로운 모험을 위해' },
      { item: '즉석 카메라', icon: '📷', reason: '순간 포착하기 좋아요' },
      { item: '체험 선물권', icon: '🎫', reason: '새로운 경험 선물' },
      { item: '무선 이어버드', icon: '🎧', reason: '어디서든 음악과 함께' },
      { item: '컬러풀한 액세서리', icon: '💍', reason: '밝은 에너지 표현' },
    ],
  },

  // ========================================
  // 조화로운 무지개 (Balanced Rainbow)
  // 중립 - mid/mid/mid/mid
  // ========================================
  balanced_rainbow: {
    strengths: [
      {
        icon: '🌈',
        title: '균형 잡힌 시각',
        description: '여러 관점을 이해하고 조화를 이뤄요',
      },
      {
        icon: '🤝',
        title: '뛰어난 중재 능력',
        description: '갈등 상황에서 양쪽을 이해하고 조율해요',
      },
      {
        icon: '🎭',
        title: '다재다능함',
        description: '다양한 상황에 맞춰 유연하게 대응해요',
      },
    ],
    weaknesses: [
      {
        icon: '🤔',
        title: '우유부단함',
        tip: '작은 결정부터 빠르게! 완벽한 선택은 없어요',
      },
      {
        icon: '😐',
        title: '특색 없어 보임',
        tip: '가끔은 한쪽으로 확 기울어보세요! 괜찮아요 ㅋㅋ',
      },
    ],
    playlist: [
      { title: 'Viva La Vida', artist: 'Coldplay', genre: 'Alternative', mood: '조화로운' },
      { title: 'Count on Me', artist: 'Bruno Mars', genre: 'Pop', mood: '따뜻한' },
      { title: 'Somewhere Over the Rainbow', artist: 'Israel Kamakawiwo\'ole', genre: 'Hawaiian', mood: '평화로운' },
      { title: 'Imagine', artist: 'John Lennon', genre: 'Classic Rock', mood: '희망적' },
      { title: 'Lean On', artist: 'Major Lazer', genre: 'EDM', mood: '균형잡힌' },
      { title: 'Beautiful Day', artist: 'U2', genre: 'Rock', mood: '긍정적' },
    ],
    places: [
      { type: '복합문화공간', vibe: ['다양함', '조화', '편안함'], reason: '다양한 경험을 한 곳에서' },
      { type: '코워킹 스페이스', vibe: ['균형', '소셜', '효율'], reason: '일과 놀이의 조화' },
      { type: '공원', vibe: ['평화', '자연', '여유'], reason: '혼자도 좋고 같이도 좋은 곳' },
      { type: '브런치 카페', vibe: ['편안함', '다양성', '적당함'], reason: '아침도 점심도 되는 유연함' },
    ],
    activities: [
      { name: '요가/필라테스', icon: '🧘', difficulty: 'medium', social: 'small', energy: 'moderate' },
      { name: '산책', icon: '🚶', difficulty: 'easy', social: 'small', energy: 'calm' },
      { name: '보드게임', icon: '🎲', difficulty: 'medium', social: 'small', energy: 'moderate' },
      { name: '쿠킹 클래스', icon: '👨‍🍳', difficulty: 'medium', social: 'small', energy: 'moderate' },
      { name: '갤러리 투어', icon: '🖼️', difficulty: 'easy', social: 'small', energy: 'calm' },
      { name: '자전거', icon: '🚲', difficulty: 'easy', social: 'small', energy: 'moderate' },
    ],
    content: {
      movies: ['인사이드 아웃', '라이프 오브 파이', '리틀 미스 선샤인', '그랜드 부다페스트 호텔'],
      books: ['다양한 장르 섭렵', '에세이', '자기계발', '인문학'],
      youtubeTypes: ['교양 콘텐츠', '다큐멘터리', '일상 브이로그', '다양한 장르'],
    },
    food: {
      cuisines: ['모든 음식 OK', '퓨전 요리', '브런치', '샐러드'],
      cafeVibes: ['복합 문화 카페', '북적하지 않은 카페', '브런치 카페'],
    },
    gifts: [
      { item: '선물 세트', icon: '🎁', reason: '다양한 구성이 좋아요' },
      { item: '문화상품권', icon: '🎫', reason: '원하는 걸 골라 쓸 수 있어요' },
      { item: '플래너', icon: '📅', reason: '균형잡힌 일정 관리' },
      { item: '멀티 툴', icon: '🔧', reason: '다재다능함의 상징' },
      { item: '식물', icon: '🌱', reason: '조화로운 공간 만들기' },
    ],
  },

  // ========================================
  // 신비로운 오로라 (Mysterious Aurora) - DEFAULT
  // ========================================
  default: {
    strengths: [
      {
        icon: '✨',
        title: '독특한 개성',
        description: '누구와도 다른 나만의 매력이 있어요',
      },
      {
        icon: '🎨',
        title: '예측 불가능한 창의성',
        description: '뜻밖의 아이디어와 발상으로 놀라게 해요',
      },
      {
        icon: '🌟',
        title: '신비로운 매력',
        description: '복잡하고 다층적인 성격이 매력적이에요',
      },
    ],
    weaknesses: [
      {
        icon: '🤷',
        title: '스스로도 이해 어려움',
        tip: '괜찮아요! 복잡한 게 매력이에요. 천천히 알아가세요',
      },
      {
        icon: '🌪️',
        title: '일관성 부족',
        tip: '변화무쌍한 건 단점이 아니에요. 그게 바로 당신!',
      },
    ],
    playlist: [
      { title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'Progressive Rock', mood: '신비로운' },
      { title: 'Space Oddity', artist: 'David Bowie', genre: 'Art Rock', mood: '몽환적' },
      { title: 'Pyramid Song', artist: 'Radiohead', genre: 'Alternative', mood: '복잡한' },
      { title: 'Teardrop', artist: 'Massive Attack', genre: 'Trip-Hop', mood: '신비로운' },
      { title: 'Knights of Cydonia', artist: 'Muse', genre: 'Alternative Rock', mood: '극적인' },
      { title: 'Lateralus', artist: 'Tool', genre: 'Progressive Metal', mood: '복잡한' },
    ],
    places: [
      { type: '예술 전시회', vibe: ['독특함', '창의적', '신비'], reason: '예측 불가능한 감성 충전' },
      { type: '테마 카페', vibe: ['개성', '특이함', '흥미'], reason: '일반적이지 않은 공간이 좋아요' },
      { type: '비밀 장소', vibe: ['신비로움', '특별함', '독특함'], reason: '숨겨진 명소 찾기' },
      { type: '몽환적인 바', vibe: ['신비', '분위기', '독특'], reason: '독특한 분위기가 좋아요' },
    ],
    activities: [
      { name: '실험적 예술', icon: '🎨', difficulty: 'medium', social: 'solo', energy: 'moderate' },
      { name: '명상/영적 활동', icon: '🔮', difficulty: 'medium', social: 'solo', energy: 'calm' },
      { name: '독립 영화 감상', icon: '🎬', difficulty: 'easy', social: 'solo', energy: 'calm' },
      { name: '창작 활동', icon: '✍️', difficulty: 'medium', social: 'solo', energy: 'moderate' },
      { name: '음악 탐구', icon: '🎵', difficulty: 'medium', social: 'solo', energy: 'calm' },
      { name: '여행/탐험', icon: '🗺️', difficulty: 'medium', social: 'small', energy: 'moderate' },
    ],
    content: {
      movies: ['인셉션', '이터널 선샤인', '클라우드 아틀라스', '트리 오브 라이프'],
      books: ['실험적 소설', '초현실주의', '철학서', '형이상학'],
      youtubeTypes: ['실험적 콘텐츠', '예술 채널', '철학 토론', '신비주의'],
    },
    food: {
      cuisines: ['퓨전', '실험적 요리', '특이한 음식', '이국적 음식'],
      cafeVibes: ['테마 카페', '독특한 컨셉', '숨은 맛집'],
    },
    gifts: [
      { item: '예술 작품', icon: '🖼️', reason: '독특한 취향 저격' },
      { item: '희귀한 향수', icon: '🧴', reason: '신비로운 향기' },
      { item: '크리스탈/스톤', icon: '💎', reason: '신비로운 에너지' },
      { item: '실험적 책', icon: '📚', reason: '독특한 관점 탐구' },
      { item: '빈티지 아이템', icon: '📻', reason: '시대를 초월한 매력' },
    ],
  },
}

/**
 * 아키타입 키로 콘텐츠 가져오기
 */
export function getArchetypeContent(archetypeKey: string): ArchetypeContent {
  const key = archetypeKey as ArchetypeKey
  return ARCHETYPE_CONTENT[key] || ARCHETYPE_CONTENT.default
}
