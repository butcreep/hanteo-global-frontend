import React, { useRef, useCallback, useState, useEffect } from "react";
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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [allowFetch, setAllowFetch] = useState(false);

  const handleObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage || !hasNextPage) return;

      if (observerRef.current) observerRef.current.disconnect();

      if (node) {
        const observer = new IntersectionObserver(
          entries => {
            const entry = entries[0];
            if (entry.isIntersecting && allowFetch) {
              fetchNextPage();
              setAllowFetch(false);
            }
          },
          { threshold: 0.5 },
        );
        observer.observe(node);
        observerRef.current = observer;
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage, allowFetch],
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const nearBottom = scrollTop + clientHeight >= scrollHeight - 50;

    if (nearBottom) {
      setAllowFetch(true);
    }
  };

  useEffect(() => {
    if (footerRef.current) {
      handleObserver(footerRef.current);
    }
  }, [handleObserver]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-auto px-4 pt-3 pb-3 mt-3 bg-gray-100 scrollbar-hide"
    >
      <h2 className="font-bold text-sm mb-3">콘텐츠 큐레이션</h2>

      <ul className="list-none p-0 m-0 space-y-3">
        {items.map(item => (
          <li key={item.id} className="bg-white p-3 rounded shadow flex items-center gap-2">
            <div className="w-12 h-12 bg-gray-300 rounded" />
            <span className="text-sm">{item.text}</span>
          </li>
        ))}
      </ul>

      <div ref={footerRef} className="h-24 flex flex-col items-center justify-center text-xs text-gray-500">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-1">↑</div>
        <span>최하단 푸터 영역</span>
      </div>

      {isFetchingNextPage && <p className="text-center py-2 text-sm">Loading...</p>}
    </div>
  );
}

export default CategoryContent;
