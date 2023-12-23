import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ProductType } from "../../store/product/productTypes";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";

import style from "./slider.module.css";

type SliderProps = {
  slides: ProductType[];
};

export const Slider = ({ slides }: SliderProps) => {
  const everyFourthSlide = slides.filter((_slide, index) => index % 4 === 0);
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={25}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 25,
        },
      }}
    >
      {everyFourthSlide.map((slide: ProductType) => (
        <SwiperSlide key={slide.id} className={style.img}>
          <img src={slide.img} alt={slide.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
