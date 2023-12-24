import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ProductType } from "../../store/product/productTypes";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/bundle";
import "swiper/css/effect-fade"; // Add fade effect
import style from "./slider.module.css";
import { useEffect } from "react";
import i18n from "../../locales/i18n";

type SliderProps = {
  slides: ProductType[];
};

export const Slider = ({ slides }: SliderProps) => {
  const everyFourthSlide = slides.filter((_slide, index) => index % 4 === 0);

  useEffect(() => {
    const currentLanguage = i18n.language;
    document.body.dir = currentLanguage === "sa" ? "rtl" : "ltr";
  }, []);

  return (
    <Swiper
      effect="fade"
      modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      fadeEffect={{ crossFade: true }}
      navigation
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop={true}
      spaceBetween={0}
      pagination={{ clickable: true, dynamicBullets: true }}
      scrollbar={{ draggable: true }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      }}
      className={`${style.swiper_container} ${style.full_width}`}
    >
      {everyFourthSlide.map((slide: ProductType) => (
        <SwiperSlide key={slide.id}>
          <div className={`${style.slide} ${style.slideContent}`}>
            <img
              src={slide.img}
              alt={slide.title}
              className={style.slideImage}
            />
          </div>
        </SwiperSlide>
      ))}
      {/* <SwiperSlide className={style.slide}>
        <img
          src="src\assets\slider1.jpg"
          className={style.slideImage}
        />
      </SwiperSlide>
      <SwiperSlide className={style.slide}>
        <img
          src="src\assets\slider2.jpg"
          className={style.slideImage}
        />
      </SwiperSlide>
      <SwiperSlide className={style.slide}>
        <img src="src\assets\slider3.jpg" className={style.slideImage} />
      </SwiperSlide>
      <SwiperSlide className={style.slide}>
        <img src="src\assets\slider4.jpg" className={style.slideImage} />
      </SwiperSlide>
      <SwiperSlide className={style.slide}>
        <img src="src\assets\slider5.jpg" className={style.slideImage} />
      </SwiperSlide>
      <SwiperSlide className={style.slide}>
        <img src="src\assets\slider6.jpg" className={style.slideImage} />
      </SwiperSlide> */}
    </Swiper>
  );
};
