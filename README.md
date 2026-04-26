# Leejeongmin · Portfolio Website

이정민(Leejeongmin) · Product Designer 포트폴리오 사이트.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Motion** (framer-motion 후속) — 호버/스크롤 인터랙션
- **Pretendard** Variable + **Material Symbols Rounded**

## Concept

전부 그레이톤(쿨 그레이) 팔레트만으로 구성된 미니멀 에디토리얼 포트폴리오.
마우스 호버에 반응하는 인터랙션을 디자인의 중심에 두었습니다.

### Featured projects

- Litmers Partner — B2B platform
- MATE — Mobile app
- Betalab — Web service
- Dip — Brand & product

## Interactions

- 마우스를 따라다니는 커스텀 커서 (mix-blend-difference 로 그레이톤에서도 대비 유지)
- 호버 시 팽창되는 라벨 커서 (`data-cursor-label` 속성으로 어떤 요소든 적용)
- 마그네틱 버튼 (Contact CTA)
- Works 리스트 호버 시 마우스를 따라다니는 프로젝트 프리뷰 카드
- 스크롤 위치에 따라 변하는 헤더 / 패럴랙스 Hero / Reveal 애니메이션
- 무한 마퀴 (Marquee) 키워드 띠

## Development

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000)

## Structure

```
src/
  app/
    layout.tsx        # Pretendard, Material Symbols, Cursor 마운트
    page.tsx          # 모든 섹션 조합
    globals.css       # 그레이톤 디자인 토큰
  components/
    cursor.tsx        # 커스텀 커서 (mix-blend-difference)
    magnetic.tsx      # 마그네틱 호버 효과 래퍼
    icon.tsx          # Material Symbols Rounded 아이콘
    reveal.tsx        # 스크롤 인뷰 페이드업
    header.tsx
    hero.tsx
    marquee.tsx
    works.tsx         # 호버 프리뷰 + 리스트
    about.tsx
    case-list.tsx
    contact.tsx
    footer.tsx        # 서울 시간 표시
  lib/
    projects.ts       # 프로젝트 데이터
```
