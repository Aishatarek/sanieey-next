"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode } from "swiper/modules";

export default function Reviews() {
  const swiperRef = useRef<any>(null);

  const handleSlideClick = (index: number) => {  // تحديد نوع الـ index
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
        loop={true}
        centeredSlides={true}
        centeredSlidesBounds={true}
        modules={[FreeMode]}
        className="mySwiper reviewsSec mt-7"
        breakpoints={{
          0: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
        }}
      >
        {[...Array(5)].map((_, index) => (
          <SwiperSlide key={index} onClick={() => handleSlideClick(index)}>
            <img src="/images/Ellipse 9.jpg" alt="User" />
            <div className="review-div">
              <h3>طارق سليمان</h3>
              <div className="riting">
                <img src="/images/Starf.svg" alt="" />
                <img src="/images/Starf.svg" alt="" />
                <img src="/images/Starf.svg" alt="" />
                <img src="/images/Star.svg" alt="" />
                <img src="/images/Star.svg" alt="" />
              </div>
              <div className="text-box">
                خدمة ممتازة وساعدتني في الحصول على متابعين في أسرع وقت وكانت ميزة التقييمات مفيدة جدًا.
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* أزرار التنقل */}
        <div className="swiper-button-prev">Previous</div>
        <div className="swiper-button-next">Next</div>
      </Swiper>
    </>
  );
}
