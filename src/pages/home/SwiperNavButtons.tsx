import { useSwiper } from "swiper/react";
import style from "./style.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div>
      <button className={style.nav_Btn_prev} onClick={() => swiper.slidePrev()}>
        <IoIosArrowBack />
      </button>
      <button className={style.nav_Btn_next} onClick={() => swiper.slideNext()}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};
