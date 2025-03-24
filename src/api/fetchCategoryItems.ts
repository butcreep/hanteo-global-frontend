import type { Category } from "@/constants/categories";
import type { QueryFunctionContext } from "react-query";

export interface FetchItem {
  id: number;
  text: string;
}

export interface FetchResponse {
  items: FetchItem[];
  nextPage: number;
  hasMore: boolean;
}

const ITEMS_PER_PAGE = 7;

export async function fetchCategoryItems({
  pageParam = 0,
  queryKey,
}: QueryFunctionContext<[string, Category]>): Promise<FetchResponse> {
  const [, category] = queryKey;
  await new Promise(res => setTimeout(res, 500));

  const start = pageParam;
  const items = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => ({
    id: start + i,
    text: `${category} ${start + i + 1}`,
  }));

  return {
    items,
    nextPage: start + ITEMS_PER_PAGE,
    hasMore: true,
  };
}
