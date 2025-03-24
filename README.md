# 한터글로벌 프론트엔드 과제

이 페이지는 **Next.js**, **TypeScript**, **Tailwind CSS**, **React Query**, **Swiper**, 그리고 **Emotion** 등을 사용하여 UI를 구현하였습니다.

- 🔗 Vercel 배포 주소: https://hanteo-global-frontend.vercel.app/

---

## 🧩 주요 기능

### ✅ 카테고리 탭 (SwiperNav)

- 상단에 고정된 카테고리 탭이 있으며, **Swiper**를 이용해 수평 스와이프 및 클릭 시 활성화됩니다.
- 활성 탭은 **자동으로 중앙에 노출**되도록 스크롤됩니다.

### ✅ 메인 슬라이드 (MainSlide)

- 중단에 **배너 슬라이드**가 있으며, **루프 및 페이지네이션(dot) 기능**을 포함합니다.
- 다음 슬라이드가 일부 보이도록 디자인되어, 사용자가 **스와이프 가능함을 직관적으로 알 수 있습니다.**

### ✅ 무한 스크롤 콘텐츠 (ContentList & CategoryContent)

- 하단 콘텐츠 영역은 각 카테고리별로 구성되며,
  - `React Query`의 `useInfiniteQuery`
  - `IntersectionObserver`
    를 활용해 **무한 스크롤**을 구현하였습니다.
- 스크롤을 당기면 자동으로 새로운 데이터가 로드됩니다.

### ✅ 좋아요 버튼 (LikeButton)

- **레이아웃 바깥 하단**에 고정된 좋아요 버튼이 있으며, 버튼 클릭 시 **좋아요 수가 증가**합니다.
- 버튼 클릭 시 **하트 아이콘이 움직이는 애니메이션**이 나타납니다.
- 좋아요 수는 **React Query**를 이용하여 **모의 API 방식으로 관리**하고 있습니다.

---
