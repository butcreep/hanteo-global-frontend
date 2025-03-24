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
    <div className="bg-lightPink px-4 py-2 border-b border-gray-200">
      <Swiper slidesPerView="auto" spaceBetween={12} freeMode className="w-full">
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx} style={{ width: "auto" }}>
            <div
              ref={el => {
                itemRefs.current[idx] = el;
              }}
              onClick={() => onCategoryClick(idx)}
              className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer transition
                ${activeIndex === idx ? "bg-[#FF5181] text-white" : "text-black"}
              `}
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
