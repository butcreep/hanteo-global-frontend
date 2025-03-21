import type { QueryFunctionContext } from "react-query";

export interface Item {
  id: number;
  text: string;
}

export interface FetchResponse {
  items: Item[];
  nextPage: number;
  hasMore: boolean;
}

export const fetchCategoryItems = async (context: QueryFunctionContext<[string, string]>): Promise<FetchResponse> => {
  const { queryKey, pageParam = 0 } = context;
  const category = queryKey[1];

  await new Promise(res => setTimeout(res, 500));

  const items = Array.from({ length: 10 }, (_, i) => ({
    id: pageParam + i,
    text: `${category} ${pageParam + i + 1}`,
  }));

  return {
    items,
    nextPage: pageParam + 10,
    hasMore: true,
  };
};
