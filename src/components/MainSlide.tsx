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
  { id: 1, image: "/banner1.jpg", link: "https://example.com/1" },
  { id: 2, image: "/banner2.jpg", link: "https://example.com/2" },
  { id: 3, image: "/banner3.jpg", link: "https://example.com/3" },
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
      {banners.map(banner => (
        <SwiperSlide key={banner.id}>
          <a href={banner.link} target="_blank" rel="noopener noreferrer">
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image src={banner.image} alt={`Banner ${banner.id}`} fill style={{ objectFit: "cover" }} />
            </div>
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainSlide;
