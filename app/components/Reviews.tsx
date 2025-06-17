"use client";
import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper/modules";

interface Rating {
  userFullName: string;
  stars: number;
  description: string;
}

export default function Reviews() {
  const [recentRatings, setRecentRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const fetchRecentRatings = async () => {
      try {
        const response = await fetch('https://sani3ywebapiv1.runasp.net/api/Home/summary');
        const data = await response.json();
        setRecentRatings(data.recentRatings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        // Fallback data if API fails
        setRecentRatings([
          {
            userFullName: "طارق سليمان",
            stars: 3,
            description: "خدمة ممتازة وساعدتني في الحصول على متابعين في أسرع وقت وكانت ميزة التقييمات مفيدة جدًا."
          },
          {
            userFullName: "أحمد محمد",
            stars: 5,
            description: "الصنايعي كان محترف جدًا وأنهى العمل بسرعة وجودة عالية."
          },
          {
            userFullName: "محمود علي",
            stars: 4,
            description: "التعامل كان جيد والخدمة مرضية بشكل عام."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentRatings();
  }, []);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <img 
        key={i}
        src={i < rating ? "/images/Starf.svg" : "/images/Star.svg"} 
        alt={i < rating ? "filled star" : "empty star"}
      />
    ));
  };

  const handleSlideClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  if (loading) {
    return <div className="text-center py-4">جاري تحميل التقييمات...</div>;
  }

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={20}
      freeMode={false} // تغيير من true إلى false لتعطيل السحب الحر
      loop={true}
      centeredSlides={true}
      centeredSlidesBounds={true}
      modules={[FreeMode, Navigation]}
      className="mySwiper reviewsSec mt-7"
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      breakpoints={{
        0: { slidesPerView: 1, centeredSlides: true },
        768: { slidesPerView: 3, centeredSlides: true },
        1024: { slidesPerView: 3, centeredSlides: true }
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
    >
      {recentRatings.map((rating, index) => (
        <SwiperSlide 
          key={index}
          onClick={() => handleSlideClick(index)}
        >
          <img 
            src="/images/Ellipse 9.jpg" 
            alt={rating.userFullName}
            className="user-avatar"
          />
          <div className="review-div">
            <h3>{rating.userFullName}</h3>
            <div className="riting">
              {renderStars(rating.stars)}
            </div>
            <div className="text-box">
              {rating.description}
            </div>
          </div>
        </SwiperSlide>
      ))}

      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </Swiper>
  );
}