import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Banner {
  id: number;
  image: string;
  link: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image:
      "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/15/74f05577-7a61-49d7-9a41-eb2239c7bcf1.jpg?now=1742566923011",
    link: "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/15/74f05577-7a61-49d7-9a41-eb2239c7bcf1.jpg?now=1742566923011",
  },
  {
    id: 2,
    image:
      "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/07/82132a7a-ee39-498d-a7f4-c2d984ac33f8.jpg?now=1742566923011",
    link: "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/07/82132a7a-ee39-498d-a7f4-c2d984ac33f8.jpg?now=1742566923011",
  },
  {
    id: 3,
    image:
      "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/06/2e9401b6-d46e-42a7-a3b0-4b9065465fcd.jpg?now=1742566923011",
    link: "https://resource.hanteochart.io/hanteonews/article/thumbnail/2022/07/06/2e9401b6-d46e-42a7-a3b0-4b9065465fcd.jpg?now=1742566923011",
  },
];

const MainSlide = () => {
  return (
    <Swiper
      autoplay={{ delay: 3000 }}
      loop
      navigation
      pagination={{ clickable: true }}
      modules={[Autoplay, Navigation, Pagination]}
      style={{ width: "100%", height: "100%" }}
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <a href={banner.link} target="_blank" rel="noopener noreferrer">
            <div
              style={{ position: "relative", width: "100%", height: "100%" }}
            >
              <Image
                src={banner.image}
                alt={`Banner ${banner.id}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlide;
