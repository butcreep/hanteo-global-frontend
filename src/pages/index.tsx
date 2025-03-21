import dynamic from "next/dynamic";
import { useState } from "react";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import SwiperNav from "../components/Nav";
import MainSlide from "../components/MainSlide";

// ✅ SSR 비활성화로 Swiper 오류 방지 (CSR에서만 렌더링)
const ContentList = dynamic(() => import("../components/ContentList"), { ssr: false });

const categories = ["차트", "Whook", "이벤트", "뉴스", "스토어", "충전소", "전체", "최신", "인기"];

const Home: NextPage = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <Layout>
      <div className="h-[50px]">
        <SwiperNav
          categories={categories}
          activeIndex={activeCategory}
          onCategoryClick={index => setActiveCategory(index)}
        />
      </div>

      <div className="h-[200px]">
        <MainSlide />
      </div>

      <div className="overflow-hidden h-[400px]">
        <ContentList
          categories={categories}
          activeIndex={activeCategory}
          onCategoryChange={index => setActiveCategory(index)}
        />
      </div>
    </Layout>
  );
};

export default Home;
