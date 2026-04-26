export type ProjectSection = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  client: string;
  role: string;
  year: string;
  category: string;
  summary: string;
  intro: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "litmers-partner",
    index: "01",
    name: "Litmers Partner",
    client: "Litmers",
    role: "Lead Product Designer",
    year: "2024",
    category: "B2B Platform",
    summary:
      "파트너사가 직접 콘텐츠를 운영하는 B2B 도구. 정보 위계와 반복 작업의 인지 부하를 줄이는 데 집중했습니다.",
    intro:
      "파트너사가 자체적으로 콘텐츠를 등록하고 운영 현황을 파악할 수 있어야 했습니다. 기존 어드민은 기능이 흩어져 있고 상태 표기가 일관되지 않아 학습 곡선이 가파른 상태였습니다. 정보 구조와 상태 시스템을 다시 설계해, 운영자가 필요한 작업을 한 화면 안에서 끝낼 수 있도록 다듬었습니다.",
    sections: [
      {
        title: "Information architecture",
        body: "역할별 권한과 작업 빈도를 기준으로 메뉴를 다시 묶고, 자주 쓰는 기능을 상단으로 끌어올렸습니다.",
      },
      {
        title: "Status system",
        body: "콘텐츠 상태 8종을 4개 레벨로 정리하고, 색이 아닌 위치와 텍스트 라벨로 구분되도록 통일했습니다.",
      },
      {
        title: "Bulk actions",
        body: "반복 작업을 한 번에 처리할 수 있도록 다중 선택 패턴과 컨펌 다이얼로그 규칙을 정의했습니다.",
      },
    ],
  },
  {
    slug: "mate",
    index: "02",
    name: "MATE",
    client: "MATE",
    role: "Product Designer",
    year: "2023",
    category: "Mobile App",
    summary:
      "사용자가 자연스럽게 관계를 형성하도록 돕는 커뮤니티 모바일 서비스.",
    intro:
      "초기 사용자가 첫 행동까지 도달하는 비율이 낮은 상태였습니다. 온보딩 흐름을 분해해 정보 입력 단계를 줄이고, 첫 화면이 사용자에게 보여주는 신호를 다시 설계했습니다.",
    sections: [
      {
        title: "Onboarding",
        body: "필수 입력을 3단계로 줄이고, 각 단계가 사용자에게 어떤 가치를 주는지 명확히 보이도록 했습니다.",
      },
      {
        title: "First screen",
        body: "관심사 매칭 결과를 우선 노출해, 가입 직후 첫 인터랙션이 발생할 확률을 높였습니다.",
      },
    ],
  },
  {
    slug: "betalab",
    index: "03",
    name: "Betalab",
    client: "Betalab",
    role: "Product Designer",
    year: "2023",
    category: "Web Service",
    summary: "초기 제품을 빠르게 검증하기 위한 실험 플랫폼.",
    intro:
      "팀이 가설–실험–학습 루프를 한 화면에서 추적할 수 있도록 구조화한 프로젝트입니다. 실험의 상태를 추적하기 위해 흩어져 있던 도구를 하나의 워크스페이스로 통합했습니다.",
    sections: [
      {
        title: "Experiment hub",
        body: "가설부터 결과까지 한 카드 안에서 보이도록 묶어, 팀 전체가 실험 진행 상황을 같은 언어로 공유합니다.",
      },
      {
        title: "Learning log",
        body: "실험이 끝난 뒤 남는 학습을 자동으로 정리해 다음 실험 설계에 곧장 활용되도록 했습니다.",
      },
    ],
  },
  {
    slug: "dip",
    index: "04",
    name: "Dip",
    client: "Dip",
    role: "Product Designer",
    year: "2022",
    category: "Brand & Product",
    summary: "브랜드 톤과 제품 경험을 동시에 정렬한 프로젝트.",
    intro:
      "브랜드 리뉴얼과 제품 UI 개편이 같은 시점에 진행됐습니다. 톤 가이드와 인터랙션 원칙을 함께 정의해, 작은 디테일까지 일관된 무드를 유지하도록 정렬했습니다.",
    sections: [
      {
        title: "Tone & motion",
        body: "정적인 톤 가이드를 모션 타이밍과 함께 묶어, 브랜드의 무드를 인터랙션 단위까지 확장했습니다.",
      },
      {
        title: "System pieces",
        body: "버튼·카드·내비 등 핵심 요소만 시스템화하고, 나머지는 패턴 가이드로 자유도를 남겼습니다.",
      },
    ],
  },
  {
    slug: "ux-writing-plugin",
    index: "05",
    name: "UX Writing Plugin",
    client: "Personal",
    role: "Solo Designer & Developer",
    year: "2025",
    category: "Tool · Plugin",
    summary:
      "디자이너가 화면 안에서 바로 카피 톤을 점검할 수 있도록 만든 사이드 프로젝트.",
    intro:
      "디자인 파일과 실제 제품의 카피가 어긋나는 문제를 자주 마주쳤습니다. 디자이너가 화면 안에서 톤 가이드를 곁에 두고 작업할 수 있도록 작은 플러그인을 만들었습니다. 톤 일관성, 모호한 표현, 사용자 행동을 가리지 않는 라벨 등을 한 번에 점검합니다.",
    sections: [
      {
        title: "Inline check",
        body: "선택한 텍스트 레이어 옆에 결과를 즉시 띄워, 작업 흐름을 끊지 않고 카피 톤을 확인할 수 있도록 설계했습니다.",
      },
      {
        title: "Custom rules",
        body: "팀별 보이스 가이드를 룰셋으로 등록할 수 있도록 구조를 열어, 조직마다 다른 톤 기준을 그대로 반영합니다.",
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function getPreviousProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i - 1 + projects.length) % projects.length];
}
