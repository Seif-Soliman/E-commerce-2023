import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ProductType } from "../../store/product/productTypes";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import style from "./slider.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
    >
      {everyFourthSlide.map((slide: ProductType) => (
        <SwiperSlide key={slide.id} className={style.img}>
          <img src={slide.img} alt={slide.title} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
