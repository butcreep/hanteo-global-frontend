import dynamic from "next/dynamic";
import { useState } from "react";
import type { NextPage } from "next";
import Layout from "@/components/Layout";
import SwiperNav from "@/components/Nav";
import MainSlide from "@/components/MainSlide";
import { CATEGORIES } from "@/constants/categories";

// ✅ SSR 비활성화로 Swiper 오류 방지 (CSR에서만 렌더링)
const ContentList = dynamic(() => import("@/components/ContentList"), { ssr: false });

const Home: NextPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <Layout>
      <div className="h-[50px]">
        <SwiperNav
          categories={CATEGORIES}
          activeIndex={activeCategory}
          onCategoryClick={index => setActiveCategory(index)}
        />
      </div>

      <div className="h-[200px]">
        <MainSlide />
      </div>

      <div className="overflow-hidden h-auto">
        <ContentList
          categories={CATEGORIES}
          activeIndex={activeCategory}
          onCategoryChange={index => setActiveCategory(index)}
        />
      </div>
    </Layout>
  );
};

export default Home;
