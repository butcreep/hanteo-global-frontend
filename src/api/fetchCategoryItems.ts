import type { Category } from "@/constants/categories";

export interface FetchItem {
  id: number;
  text: string;
}

export interface FetchResponse {
  items: FetchItem[];
  nextPage: number;
  hasMore: boolean;
}

export async function fetchCategoryItems({
  pageParam = 0,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, Category];
}): Promise<FetchResponse> {
  const [, category] = queryKey;
  await new Promise(res => setTimeout(res, 500)); // delay simulation
  const start = pageParam;

  const items = Array.from({ length: 10 }, (_, i) => ({
    id: start + i,
    text: `${category} ${start + i + 1}`,
  }));

  return {
    items,
    nextPage: start + 10,
    hasMore: true,
  };
}
