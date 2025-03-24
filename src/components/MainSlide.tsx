import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Banner {
  id: number;
  image: string;
  link: string;
  title: string;
  date: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image:
      "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/15/74f05577-7a61-49d7-9a41-eb2239c7bcf1.jpg",
    link: "https://www.hanteochart.com/",
    title: "[M COUNTDOWN] 10월 2주차 엠카 사전 투표…",
    date: "2020.02.08 ~ 2020.04.08 17:00 (KST)",
  },
  {
    id: 2,
    image:
      "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/07/82132a7a-ee39-498d-a7f4-c2d984ac33f8.jpg",
    link: "https://hanteonews.com/",
    title: "HANTEO NEWS - 공식 기사 공개!",
    date: "2023.06.01 ~ 2023.12.31",
  },
  {
    id: 3,
    image:
      "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/06/2e9401b6-d46e-42a7-a3b0-4b9065465fcd.jpg",
    link: "https://awards.hanteo.com/",
    title: "2023 HANTEO MUSIC AWARDS 사전 안내",
    date: "2023.01.01 ~ 2023.12.31",
  },
];

const MainSlide = () => {
  return (
    <div className="relative px-4">
      <Swiper
        modules={[Pagination]}
        slidesPerView="auto"
        centeredSlides
        loop
        spaceBetween={10}
        pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
        className="!overflow-visible"
      >
        {banners.map(banner => (
          <SwiperSlide key={banner.id} style={{ width: "90%", maxWidth: "360px" }}>
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <div className="relative w-full h-[200px] rounded-xl overflow-hidden shadow-md bg-white">
                <Image src={banner.image} alt={`Banner ${banner.id}`} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                  진행 중
                </div>
                <div className="absolute bottom-0 left-0 w-full p-2 bg-white/90 text-sm">
                  <p className="font-semibold truncate">{banner.title}</p>
                  <p className="text-xs text-gray-500">{banner.date}</p>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-swiper-pagination mt-7 flex justify-center " />
    </div>
  );
};

export default MainSlide;
