import "./ProductCarousel.css";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import {Mousewheel, Pagination} from "swiper";
import {useDispatch} from "react-redux";
import {changeCurrentColor} from "../../data/redux/reducers/shopSlice";

export function ProductCarousel({product, setProduct}) {


    return (
        <Swiper
            direction={"vertical"}
            slidesPerView={5}
            spaceBetween={4}
            mousewheel={true}
            modules={[Mousewheel, Pagination]}
            className="mySwiper"
        >
            {product.images.map(image => {
                return (
                    <SwiperSlide
                        className={image.id === product.currentImage.id ? "selected" : ""}
                        key={image.id}
                        onClick={() => setProduct({...product, currentImage: image})}
                    >
                        <img src={require(`../../assets/products/${image.imageName}`)} alt="product"/>
                    </SwiperSlide>
                )
            })
            }
        </Swiper>
    )
}