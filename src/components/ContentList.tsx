import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import type { Category } from "@/constants/categories";
import CategoryContent from "@/components/CategoryContent";

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
    <div className="h-full ">
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        onSlideChange={swiper => onCategoryChange(swiper.activeIndex)}
        initialSlide={activeIndex}
        style={{ height: "100%" }}
      >
        {categories.map((category, idx) => (
          <SwiperSlide key={idx}>
            <div className="h-full bg-gray-100 scrollbar-hide">
              <CategoryContent category={category} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ContentList;
