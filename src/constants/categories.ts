export const CATEGORIES = ["차트", "Whook", "이벤트", "뉴스", "스토어", "충전소", "전체", "최신", "인기"] as const;

export type Category = (typeof CATEGORIES)[number];
