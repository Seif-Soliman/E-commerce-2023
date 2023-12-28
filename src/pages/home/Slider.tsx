import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

import style from "./style.module.css";
import { SwiperNavButtons } from "./SwiperNavButtons";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import i18n from "../../locales/i18n";

const Slider = () => {
  useEffect(() => {
    const currentLanguage = i18n.language;
    document.body.dir = currentLanguage === "sa" ? "rtl" : "ltr";

    const swiperElement = document.querySelector(".swiper_container");
    if (swiperElement) {
      swiperElement.classList.add(
        currentLanguage === "sa" ? "swiper_rtl" : "swiper_ltr"
      );
    }
  }, []);

  return (
    <div className={`${style.page} ${style.swiper_container}`}>
      <Swiper
        className={`${style.swiper_slide} ${style.swiper_wrapper}  ${style.swiper_container}`}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        pagination={{ clickable: true, dynamicBullets: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
          1200: {
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide>
          <img src="src\assets\swiper1.jpg" className={style.slideImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src\assets\swiper2.jpg" className={style.slideImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src\assets\swiper3.jpg" className={style.slideImage} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="src\assets\swiper4.jpg" className={style.slideImage} />
        </SwiperSlide>
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
};
export default Slider;
