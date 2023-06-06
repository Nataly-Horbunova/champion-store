import "./ProductCarousel.css";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Mousewheel, Pagination} from "swiper";

export function ProductCarousel({images}) {

    return (
        <Swiper
            direction={"vertical"}
            slidesPerView={5}
            spaceBetween={4}
            mousewheel={true}
            modules={[Mousewheel, Pagination]}
            className="mySwiper"
        >
            {images.map(image => {
                return (
                    <SwiperSlide className="swiper_slide_custom" key={image.id}>
                        <img src={require(`../../assets/products/${image.image}`)} alt="product"/>
                    </SwiperSlide>
                )
            })
            }
        </Swiper>
    )
}