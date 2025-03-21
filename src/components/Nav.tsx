import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface NavProps {
  categories: string[];
  activeIndex: number;
  onCategoryClick: (index: number) => void;
}

function SwiperNav({ categories, activeIndex, onCategoryClick }: NavProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const current = itemRefs.current[activeIndex];
    current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  return (
    <div className="border-b border-gray-300 px-4 py-2 overflow-x-auto no-scrollbar">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        freeMode
        onSwiper={swiper => (swiperRef.current = swiper)}
        className="w-full"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx} style={{ width: "auto" }}>
            <div
              ref={el => (itemRefs.current[idx] = el)}
              onClick={() => onCategoryClick(idx)}
              className={`font-bold whitespace-nowrap px-2 cursor-pointer ${
                activeIndex === idx ? "text-blue-500" : "text-gray-600"
              }`}
            >
              {cat}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperNav;
