'use client';

import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

interface Craftsman {
  id: string;
  fullName: string;
  profession: string;
  location: string;
  averageRating: number;
  profileImage?: string;
  isTrusted: boolean;
}

interface ApiResponse {
  craftsmen: Craftsman[];
}

interface LocationsResponse {
  locations: string[];
}

const AISearch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch available locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://sani3ywebapiv1.runasp.net/api/AiCraftsman/locations');
        const data: LocationsResponse = await response.json();
        setLocations(data.locations || []);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };
    
    fetchLocations();
  }, []);

  // Handle search when location or query changes
  useEffect(() => {
    if (craftsmen.length > 0 || query.trim()) {
      handleSearch();
    }
  }, [selectedLocation]);

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

  const handleSearch = async () => {
    if (!query.trim() && craftsmen.length === 0) return;
    
    setIsLoading(true);
  
    const authToken = localStorage.getItem('authToken');
    const url = new URL('https://sani3ywebapiv1.runasp.net/api/AiCraftsman/recommend');
    
    if (selectedLocation) {
      url.searchParams.append('location', selectedLocation);
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json-patch+json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        let errorMessage = 'حدث خطأ أثناء البحث';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // Couldn't parse JSON error
        }
        throw new Error(errorMessage);
      }
  
      const data: ApiResponse = await response.json();
      setCraftsmen(data.craftsmen || []);
    } catch (error: unknown) {
      console.error('Error calling AI recommendation API:', error);
      let errorMessage = 'حدث خطأ أثناء الاتصال بالخدمة';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'خطأ في الاتصال',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value);
    // البحث التلقائي يتم عبر useEffect الذي يراقب selectedLocation
  };

  const handleClearResults = () => {
    setCraftsmen([]);
    setQuery('');
    setSelectedLocation('');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img 
          key={i}
          src={i <= rating ? "/images/Starf.svg" : "/images/Star.svg"} 
          alt={i <= rating ? "filled star" : "empty star"}
        />
      );
    }
    return stars;
  };

  return (
    <div className='search-div-all' ref={searchContainerRef}>
      <div className="gradient-border">
        <button className="button-ai" onClick={handleOpenSearch}>
          <div className="text-wrapper-10"> بحث بالذكاء الصناعي</div>
          <img className="img-2" src="/images/Group.svg" alt="AI search icon" />
        </button>
      </div>

      <div className={`search-container ${isVisible ? 'visible' : ''}`}>
        <div className="search-container-div">
          {/* Location filter - always visible */}
          {locations.length > 0 && (
            <div className="mb-4">
              <label className="block text-right mb-2 font-[Somar] font-medium text-[20px]">
                اختر المنطقة:
              </label>
              <select 
                value={selectedLocation}
                onChange={handleLocationChange}
                className="w-full p-2 border border-[#FFCC8A] rounded font-[Somar] font-medium text-[16px]"
                disabled={isLoading}
              >
                <option value="">جميع المناطق</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          )}

          {/* Search form - shown when no results or when cleared */}
          {craftsmen.length <= 0 ? (
            <form onSubmit={handleSubmit}>
              <h5 className="font-[Somar] font-extrabold text-[40px] leading-[100%] tracking-[0%] text-[#141522]">
                مـرحـبـاً بك 👋
              </h5>

              <p className="font-[Somar] font-medium text-[24px] leading-[100%] tracking-[0%] text-[#141522]">
                جرب ميزة البحث السريع بواسطة الذكاء الصناعي الان!
              </p>

              <div>
                <p className="font-[Somar] font-medium text-[20px] leading-[100%] tracking-[0%] mt-8 text-right text-[#141522]">
                  قم بكتابة وصف مختصر للعُطل/المشكله/الخدمه.
                </p>
              </div>
              <div>
                <p className="font-[Somar] font-medium text-[24px] leading-[100%] tracking-[0%] mt-8 text-[#141522]">
                  كيف يمكننا مساعدتك؟
                </p>

                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="مثال: عندي مشكلة فى الغساله محتاج صنايعي يحل المشكله"
                  className="h-[167px] rounded-[8px] border border-[#FFCC8A] p-[20px_10px] font-[Somar] font-medium text-[20px] leading-[100%] tracking-[0%] text-right placeholder:text-[#6C7278] placeholder:font-medium placeholder:text-[20px] placeholder:leading-[100%] placeholder:tracking-[0%]"
                  disabled={isLoading}
                />

                <button 
                  type="submit" 
                  className="button-ai mt-4"
                  disabled={isLoading || !query.trim()}
                >
                  <div className="text-wrapper-10">
                    {isLoading ? 'جاري البحث...' : 'بحث'}
                  </div>
                  <img className="img-2" src="/images/Group.svg" alt="Search icon" />
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Results header with search info */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-right">نتائج البحث:</h3>
                  {query && (
                    <p className="text-right text-gray-600">"{query}" {selectedLocation && `في منطقة ${selectedLocation}`}</p>
                  )}
                </div>
                <button 
                  onClick={handleClearResults}
                  className="text-[#FF6B35] font-medium"
                >
                  بحث جديد
                </button>
              </div>
              
              {/* Craftsmen results */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1.5}
                navigation
              >
                {craftsmen.map((craftsman) => (
                  <SwiperSlide key={craftsman.id}>
                    <div className="frame-28">
                      <div className="menu-list-plus">
                        <div className="img-profile">
                          <img 
                            src={craftsman.profileImage ? `https://sani3ywebapiv1.runasp.net${craftsman.profileImage}` : "/images/Ellipse 6.svg"} 
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
                          <Link href={`/craftsman?id=${craftsman.id}`}>عرض التفاصيل</Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AISearch;