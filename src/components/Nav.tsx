import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef } from "react";
import type { Category } from "@/constants/categories";

interface NavProps {
  categories: readonly Category[];
  activeIndex: number;
  onCategoryClick: (index: number) => void;
}

function SwiperNav({ categories, activeIndex, onCategoryClick }: NavProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  return (
    <div className="border-b border-gray-300 px-4 py-2">
      <Swiper slidesPerView="auto" spaceBetween={12} freeMode className="w-full">
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx} style={{ width: "auto" }}>
            <div
              ref={el => (itemRefs.current[idx] = el)}
              onClick={() => onCategoryClick(idx)}
              className={`font-bold whitespace-nowrap px-2 cursor-pointer transition-colors duration-200 ${
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
