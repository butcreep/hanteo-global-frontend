// components/CategoryContent.tsx
import React, { useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchCategoryItems, FetchResponse } from "@/api/fetchCategoryItems";
import type { Category } from "@/constants/categories";

interface CategoryContentProps {
  category: Category;
}

function CategoryContent({ category }: CategoryContentProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    FetchResponse,
    unknown,
    FetchResponse,
    [string, Category]
  >(["categoryItems", category], fetchCategoryItems, {
    getNextPageParam: lastPage => lastPage.nextPage,
  });

  const items = data?.pages?.flatMap(page => page.items) || [];
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) {
        observerRef.current.disconnect?.();
      }

      if (node) {
        const observer = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting && hasNextPage) {
              fetchNextPage();
            }
          },
          { rootMargin: "100px" }, // 조기 로딩
        );
        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  return (
    <div className="h-full overflow-y-auto px-4 py-2">
      <ul className="list-none p-0 m-0">
        {items.map(item => (
          <li key={item.id} className="py-2 border-b border-gray-200">
            {item.text}
          </li>
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-8" />
      {isFetchingNextPage && <p className="text-center py-2">Loading...</p>}
    </div>
  );
}

export default CategoryContent;
