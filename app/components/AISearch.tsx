'use client';

import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

const AISearch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [craftsmen, setCraftsmen] = useState<any[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && 
          !searchContainerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const handleOpenSearch = () => {
    setIsVisible(true);
  };

  const renderStars = (rating: number) => {
    // Your star rendering logic here
    return <div>{/* Star icons based on rating */}</div>;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const authToken = localStorage.getItem('authToken');
  
    try {
      const response = await fetch(
        'https://sani3ywebapiv1.runasp.net/api/AiCraftsman/recommend',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json-patch+json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ query }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
        Swal.fire({
          icon: 'error',
          title: 'حدث خطأ',
          text: errorMessage,
        });
        setIsVisible(false);
        return; 
      }
  
      const data = await response.json();
      console.log('API response:', data);
      setCraftsmen(data.craftsmen || []);
    } catch (error: any) {
      console.error('Error calling AI recommendation API:', error);
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الاتصال',
        text: error.message || 'حدث خطأ أثناء الاتصال بالخدمة',
      });
      setIsVisible(false);
    }
  };

  return (
    <div className='search-div-all'>
      <div className="gradient-border">
        <button className="button-ai" onClick={handleOpenSearch}>
          <div className="text-wrapper-10"> بحث بالذكاء الصناعي</div>
          <img className="img-2" src="/images/Group.svg" alt="" />
        </button>
      </div>

      <div className={`search-container ${isVisible ? 'visible' : ''}`}>
        {craftsmen.length <= 0 ?
        <form onSubmit={handleSubmit} className="search-container-div">
          <h5 className="font-[Somar] font-extrabold text-[40px] leading-[100%] tracking-[0%] text-[#141522]">
            مـرحـبـاً بك 👋
          </h5>

          <p className="font-[Somar] font-medium text-[24px] leading-[100%] tracking-[0%] text-[#141522]">
            جرب ميزة البحث السريع بواسطة الذكاء الصناعي الان!
          </p>

          <div>
            <p className="font-[Somar] font-medium text-[20px] leading-[100%] tracking-[0%]  mt-8 text-right text-[#141522]">
              قم بكتابة وصف مختصر للعُطل/المشكله/الخدمه.
            </p>
          </div>
          <div>
            <p className="font-[Somar] font-medium text-[24px] leading-[100%] tracking-[0%] mt-8 text-[#141522]">
              كيف يمكننا مساعدتك؟
            </p>

            <textarea
              onChange={(e) => setQuery(e.target.value)}
              placeholder="مثال: عندي مشكلة فى الغساله محتاج صنايعي يحل المشكله"
              className="h-[167px] rounded-[8px] border border-[#FFCC8A] p-[20px_10px] font-[Somar] font-medium text-[20px] leading-[100%] tracking-[0%] text-right placeholder:text-[#6C7278]  placeholder:font-medium placeholder:text-[20px] placeholder:leading-[100%] placeholder:tracking-[0%]">
            </textarea>

            <button className="button-ai">
              <div className="text-wrapper-10"> بحث  </div>
              <img className="img-2" src="/images/Group.svg" alt="" />
            </button>
          </div>
        </form>
        :null
}
        {/* Swiper Slider for Craftsmen */}
        {craftsmen.length > 0 && (
                  <div className="search-container-div">

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-right">الصنايعي المناسب لك: </h3>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1.5} // 1.5 slides visible as requested
              navigation
            
            >
              {craftsmen.map((craftsman) => (
                <SwiperSlide key={craftsman.id}>
                  <div className="frame-28">
                    <div className="menu-list-plus">
                      <div className="img-profile">
                        <img 
                          src={craftsman.profileImage?`https://sani3ywebapiv1.runasp.net${craftsman.profileImage}` : "/images/Ellipse 6.svg"} 
                          alt={craftsman.fullName} 
                        />
                      </div>
                      <div className="profile-name">
                        <div><span>{craftsman.fullName}</span></div>
                        {craftsman.isTrusted && <div><img src="/images/verify.svg" alt="verified" /></div>}
                      </div>
                      <div className="work"><span>{craftsman.profession}</span></div>
                      <div className="location">
                        <div><img src="/images/Location.svg" alt="location" /></div>
                        <div><span>{craftsman.location}</span></div>
                      </div>
                      <div className="line0">
                        <div className="line0"></div>
                      </div>
                      <div className="rating-div">
                        <div className="ratimg-text">
                          <span>الــتقــييم</span>
                        </div>
                        <div className="riting">
                          {renderStars(craftsman.averageRating)}
                        </div>
                      </div>
                      <div className="more-det">
                        <Link href={`/craftsman/${craftsman.id}`}>عرض التفاصيل</Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        )}
      </div>
    </div>
  )
}

export default AISearch;