import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SliderImagesProps {
    images: string[];
}

const SliderImages: React.FC<SliderImagesProps> = ({images}) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: 3000}}
            loop={true}
            className="rounded-lg overflow-hidden shadow-md"
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <img src={img} alt={`Property ${index}`} className="w-full h-64 object-cover rounded-lg"/>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderImages;
