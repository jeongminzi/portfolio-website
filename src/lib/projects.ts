export type Project = {
  slug: string;
  index: string;
  name: string;
  client: string;
  role: string;
  year: string;
  category: string;
  summary: string;
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
      "파트너사가 직접 콘텐츠를 운영할 수 있도록 설계한 B2B 운영 도구. 정보 위계와 반복 작업의 인지 부하를 줄이는 데 집중했습니다.",
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
      "사용자가 자연스럽게 관계를 형성하도록 돕는 커뮤니티 모바일 서비스. 온보딩과 첫 행동 전환을 중심으로 흐름을 다듬었습니다.",
  },
  {
    slug: "betalab",
    index: "03",
    name: "Betalab",
    client: "Betalab",
    role: "Product Designer",
    year: "2023",
    category: "Web Service",
    summary:
      "초기 제품을 빠르게 검증하기 위한 실험 플랫폼. 가설–실험–학습 루프를 한 화면에서 추적할 수 있도록 구조화했습니다.",
  },
  {
    slug: "dip",
    index: "04",
    name: "Dip",
    client: "Dip",
    role: "Product Designer",
    year: "2022",
    category: "Brand & Product",
    summary:
      "브랜드 톤과 제품 경험을 동시에 정렬한 프로젝트. 작은 인터랙션 하나까지 일관된 무드를 유지하도록 디테일을 조율했습니다.",
  },
];
