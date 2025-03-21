// import React, { useEffect, useRef } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import type { Swiper as SwiperType } from "swiper";
// import "swiper/css";
// import { useInfiniteQuery } from "react-query";
// import { fetchCategoryItems, FetchResponse } from "@/api/fetchCategoryItems";
// import type { Category } from "@/constants/categories";

// interface ContentListProps {
//   categories: readonly Category[];
//   activeIndex: number;
//   onCategoryChange: (index: number) => void;
// }

// interface CategoryContentProps {
//   category: Category;
// }

// //  mockData.ts에 더미 데이터 모듈화하거나
// // msw(Mock Service Worker) 같은 라이브러리로 실제 API처럼 동작시키기
// function CategoryContent({ category }: CategoryContentProps) {
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
//     FetchResponse,
//     unknown,
//     FetchResponse,
//     [string, Category]
//   >(["categoryItems", category], fetchCategoryItems, {
//     getNextPageParam: lastPage => lastPage.nextPage,
//   });

//   const items = data?.pages?.flatMap(page => page.items) || [];
//   const containerRef = useRef<HTMLDivElement>(null);

//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (!container || !hasNextPage || isFetchingNextPage) return;
//     const { scrollTop, scrollHeight, clientHeight } = container;
//     if (scrollTop + clientHeight >= scrollHeight - 20) {
//       fetchNextPage();
//     }
//   };

//   return (
//     <div ref={containerRef} onScroll={handleScroll} className="h-full overflow-y-auto px-4 py-2">
//       <ul className="list-none p-0 m-0">
//         {items.map(item => (
//           <li key={item.id} className="py-2 border-b border-gray-200">
//             {item.text}
//           </li>
//         ))}
//       </ul>
//       {isFetchingNextPage && <p className="text-center py-2">Loading...</p>}
//     </div>
//   );
// }

// // ✅ 전체 콘텐츠 리스트 (카테고리 기반)
// function ContentList({ categories, activeIndex, onCategoryChange }: ContentListProps) {
//   const swiperRef = useRef<SwiperType | null>(null);

//   useEffect(() => {
//     if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex) {
//       swiperRef.current.slideTo(activeIndex);
//     }
//   }, [activeIndex]);

//   return (
//     <Swiper
//       onSwiper={swiper => (swiperRef.current = swiper)}
//       onSlideChange={swiper => onCategoryChange(swiper.activeIndex)}
//       initialSlide={activeIndex}
//       style={{ height: "100%" }}
//     >
//       {categories.map((category, idx) => (
//         <SwiperSlide key={idx}>
//           <CategoryContent category={category} />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// }

// export default ContentList;
// components/ContentList.tsx
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import type { Category } from "@/constants/categories";
import CategoryContent from "@/components/CategoryContent"; // ✅ 요거 맞습니다!

interface ContentListProps {
  categories: readonly Category[];
  activeIndex: number;
  onCategoryChange: (index: number) => void;
}

function ContentList({ categories, activeIndex, onCategoryChange }: ContentListProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <Swiper
      onSwiper={swiper => (swiperRef.current = swiper)}
      onSlideChange={swiper => onCategoryChange(swiper.activeIndex)}
      initialSlide={activeIndex}
      style={{ height: "100%" }}
    >
      {categories.map((category, idx) => (
        <SwiperSlide key={idx}>
          <CategoryContent category={category} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ContentList;
