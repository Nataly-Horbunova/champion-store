import style from './Carousel.module.scss';
import React from "react";
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {getCarouselData} from "../../data/dataFunctions";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export function Carousel() {
    let banners = getCarouselData();

    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            scrollbar={{draggable: true}}
            className={style.Carousel}>
            {banners.map(banner => {

                return (
                    <SwiperSlide key={banner.id} className={style.carousel_slide} color="color_accent_1">
                        <img src={require(`../../assets/carousel/${banner.img}`)} alt="banner" className={style.carousel_img}/>
                        <div className={style.carousel_text}>{banner.text}</div>
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}
