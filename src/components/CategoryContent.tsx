// // components/CategoryContent.tsx
// import React, { useRef, useEffect, useCallback } from "react";
// import { useInfiniteQuery } from "react-query";
// import { fetchCategoryItems, FetchResponse } from "@/api/fetchCategoryItems";
// import type { Category } from "@/constants/categories";

// interface CategoryContentProps {
//   category: Category;
// }

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
//   const observerRef = useRef<HTMLDivElement | null>(null);

//   const loadMoreRef = useCallback(
//     (node: HTMLDivElement | null) => {
//       if (isFetchingNextPage) return;

//       if (observerRef.current) {
//         observerRef.current.disconnect?.();
//       }

//       if (node) {
//         const observer = new IntersectionObserver(
//           entries => {
//             if (entries[0].isIntersecting && hasNextPage) {
//               fetchNextPage();
//             }
//           },
//           { rootMargin: "100px" }, // 조기 로딩
//         );
//         observer.observe(node);
//         observerRef.current = observer;
//       }
//     },
//     [fetchNextPage, hasNextPage, isFetchingNextPage],
//   );

//   return (
//     <div className="h-full overflow-y-auto px-4 py-2">
//       <ul className="list-none p-0 m-0">
//         {items.map(item => (
//           <li key={item.id} className="py-2 border-b border-gray-200">
//             {item.text}
//           </li>
//         ))}
//       </ul>
//       <div ref={loadMoreRef} className="h-8" />
//       {isFetchingNextPage && <p className="text-center py-2">Loading...</p>}
//     </div>
//   );
// }

// export default CategoryContent;
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchCategoryItems, FetchResponse } from "@/api/fetchCategoryItems";
import type { Category } from "@/constants/categories";

interface CategoryContentProps {
  category: Category;
}

function CategoryContent({ category }: CategoryContentProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<FetchResponse, unknown, FetchResponse, [string, Category]>(
      ["categoryItems", category],
      fetchCategoryItems,
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const items = data?.pages?.flatMap((page) => page.items) || [];
  const observerRef = useRef<IntersectionObserver | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const [allowFetch, setAllowFetch] = useState(false); // 수동 로딩만 허용

  // ✅ 사용자가 스크롤해서 푸터에 닿았을 때만 로딩
  const handleObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage || !hasNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      if (node) {
        const observer = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && allowFetch) {
              fetchNextPage();
              setAllowFetch(false); // 다시 기다리게 하기
            }
          },
          { threshold: 0.5 }
        );
        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, allowFetch]
  );

  // ✅ 사용자가 스크롤을 아래로 당겼는지 감지
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const nearBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (nearBottom) {
      setAllowFetch(true);
    }
  };

  return (
    <div onScroll={handleScroll} className="h-full overflow-y-auto px-4 py-2">
      <ul className="list-none p-0 m-0">
        {items.map((item) => (
          <li key={item.id} className="py-2 border-b border-gray-200">
            {item.text}
          </li>
        ))}
      </ul>

      {/* ✅ 푸터 영역 */}
      <div
        ref={handleObserver}
        className="h-24 flex flex-col items-center justify-center text-sm text-gray-500"
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-1">
          ↑
        </div>
        <span>최하단 푸터 영역</span>
      </div>

      {isFetchingNextPage && <p className="text-center py-2">Loading...</p>}
    </div>
  );
}

export default CategoryContent;
