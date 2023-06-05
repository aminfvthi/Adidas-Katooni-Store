import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./product-images-slider.scss";

interface IProps {
  images: string[];
}

const SingleProductImageSlider = ({ images }: IProps) => {
  return (
    <>
      <div className="lg:hidden">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="product-images-slider"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden lg:flex">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="product-images-slider"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SingleProductImageSlider;
