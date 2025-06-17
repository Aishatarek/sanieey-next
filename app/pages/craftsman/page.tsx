'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface Craftsman {
  id: string;
  fullName: string;
  profession: string;
  location: string;
  averageRating: number;
  profileImage?: string;
  identityVerified?: boolean;
}

interface PreviousWork {
  id: string;
  description?: string;
  date?: string;
  images?: string[];
}

interface Rating {
  id: string;
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerImage?: string;
  date: string;
}

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [activeTab, setActiveTab] = useState<'work' | 'reviews'>('work');
  const [craftsman, setCraftsman] = useState<Craftsman | null>(null);
  const [previousWorks, setPreviousWorks] = useState<PreviousWork[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState({
    craftsman: true,
    works: true,
    ratings: true
  });

  // API base URL
  const API_BASE_URL = 'https://sani3ywebapiv1.runasp.net/api/User';

  // Fetch craftsman details
  useEffect(() => {
    if (id) {
      const fetchCraftsman = async () => {
        try {
          console.log(`Fetching craftsman with ID: ${id}`);
          const response = await fetch(`${API_BASE_URL}/Get/craftsmenList?id=${id}`);
          console.log('Response status:', response.status);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Received data:', data);
          
          if (data.data && data.data.length > 0) {
            setCraftsman(data.data[0]);
          } else {
            console.warn('No craftsman data received');
          }
          setLoading(prev => ({...prev, craftsman: false}));
        } catch (error) {
          console.error('Error fetching craftsman:', error);
          setLoading(prev => ({...prev, craftsman: false}));
        }
      };
  
      fetchCraftsman();
    }
  }, [id]);

  // Fetch previous works
  useEffect(() => {
    if (id) {
      const fetchPreviousWorks = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/craftsman/${id}/previous-works`);
          const data = await response.json();
          setPreviousWorks(data);
          setLoading(prev => ({...prev, works: false}));
        } catch (error) {
          console.error('Error fetching previous works:', error);
          setLoading(prev => ({...prev, works: false}));
        }
      };

      fetchPreviousWorks();
    }
  }, [id]);

  // Fetch ratings
  useEffect(() => {
    if (id) {
      const fetchRatings = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/${id}/ratings`);
          const data = await response.json();
          setRatings(data);
          setLoading(prev => ({...prev, ratings: false}));
        } catch (error) {
          console.error('Error fetching ratings:', error);
          setLoading(prev => ({...prev, ratings: false}));
        }
      };

      fetchRatings();
    }
  }, [id]);

  const handleRatingSubmit = async () => {
    try {
      const formData = new FormData();
      if (craftsman) {
        formData.append('CraftsmanFirstName', craftsman.fullName.split(' ')[0] || '');
        formData.append('CraftsmanLastName', craftsman.fullName.split(' ')[1] || '');
        formData.append('Governorate', craftsman.location.split('-')[1]?.trim() || 'الجيزة');
        formData.append('Location', craftsman.location.split('-')[0]?.trim() || 'مدينة 6 اكتوبر');
      }
      formData.append('PhoneNumber', '01000000000');
      formData.append('ProfessionId', '1');
      formData.append('PreviousWorkDescription', reviewText);
      formData.append('DateTheProjectDone', new Date().toISOString());
      
      const response = await fetch(`${API_BASE_URL}/recommendCraftsman`, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        setIsModalOpen(false);
        setRatingValue(0);
        setReviewText('');
        
        // Refresh ratings
        const ratingsResponse = await fetch(`${API_BASE_URL}/${id}/ratings`);
        const ratingsData = await ratingsResponse.json();
        setRatings(ratingsData);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const updateImage = (image: string) => {
    setSelectedImage(image);
  };

  const openFullscreen = (image: string) => {
    setSelectedImage(image);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (loading.craftsman) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!craftsman) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="mt-4 text-xl font-medium text-gray-700">لم يتم العثور على الصنايعي</p>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>تفاصيل الصنايعي | {craftsman.fullName}</title>
        <meta name="description" content={`صفحة تفاصيل الصنايعي ${craftsman.fullName}`} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة
          </Link>
          
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            تفاصيل الصنايعي
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none" className="mr-2">
              <path fillRule="evenodd" clipRule="evenodd" d="M42 21.9997H17.322C19.764 19.5557 21.32 16.2277 21.32 12.6797V10.6797H17.32V12.6797C17.32 17.5577 12.876 21.9997 8 21.9997H6V25.9997H8C12.876 25.9997 17.32 30.4417 17.32 35.3197V37.3197H21.32V35.3197C21.32 31.7717 19.764 28.4437 17.322 25.9997H42V21.9997Z" fill="#141522"/>
            </svg>
          </h1>
        </div>

        {/* Craftsman Profile */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 md:mb-0 md:mr-6 bg-gray-200 flex items-center justify-center">
              {craftsman.profileImage ? (
                <img src={craftsman.profileImage} alt={craftsman.fullName} className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            
            <div className="text-center md:text-right flex-1">
              <div className="flex items-center justify-center md:justify-end">
                <h2 className="text-xl font-bold text-gray-800">{craftsman.fullName}</h2>
                {craftsman.identityVerified && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              <p className="text-gray-600 mt-1">{craftsman.profession}</p>
              
              <div className="flex items-center justify-center md:justify-end mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">{craftsman.location}</span>
              </div>
              
              <div className="h-px bg-gray-200 my-4"></div>
              
              <div className="flex items-center justify-center md:justify-between">
                <span className="text-gray-800">التقييم</span>
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 mx-0.5 ${i < Math.floor(craftsman.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <button 
                className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                onClick={() => router.push(`/request-craftsman/${id}`)}
              >
                طلب الصنايعي
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'work' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('work')}
            >
              الأعمال السابقة
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('reviews')}
            >
              التقييمات
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'work' ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            {loading.works ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : previousWorks.length > 0 ? (
              previousWorks.map((work, index) => (
                <div key={work.id} className={index !== 0 ? 'mt-8 pt-8 border-t border-gray-200' : ''}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                      <div className="relative">
                        <img 
                          src={selectedImage || work.images?.[0] || '/placeholder-work.jpg'} 
                          alt="Previous Work" 
                          className="w-full h-64 object-cover rounded-lg cursor-pointer"
                          // onClick={() => openFullscreen(selectedImage || work.images?.[0])}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm">
                          تفاصيل الصورة هنا
                        </div>
                      </div>
                      
                      {work.images && work.images.length > 0 && (
                        <div className="mt-4 overflow-x-auto">
                          <div className="flex space-x-2">
                            {work.images.map((image, idx) => (
                              <img 
                                key={idx} 
                                src={image} 
                                alt={`Work ${idx + 1}`} 
                                className="w-16 h-16 object-cover rounded cursor-pointer"
                                onClick={() => updateImage(image)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="md:w-1/2">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">وصف المشروع</h3>
                      <p className="text-gray-600 mb-4">{work.description || 'لا يوجد وصف متاح'}</p>
                      
                      {work.date && (
                        <div className="text-gray-800">
                          <span className="font-medium">تاريخ إنجاز المشروع: </span>
                          <span>{work.date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">لا توجد أعمال سابقة متاحة</p>
            )}
            
            <div className="mt-8 text-center">
              <button 
                className="bg-blue-600 text-white py-2 px-8 rounded-md hover:bg-blue-700 transition"
                onClick={() => router.push(`/request-craftsman/${id}`)}
              >
                طلب الصنايعي
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            {loading.ratings ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = ratings.reduce((acc, rating) => {
                        return rating.rating === star ? acc + 1 : acc;
                      }, 0) / ratings.length * 100 || 0;
                      
                      return (
                        <div key={star} className="flex items-center justify-between mb-2">
                          <span className="text-gray-600 w-10">{Math.round(percentage)}%</span>
                          <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600 w-6">{star}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
                    <div className="mb-2">
                      <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="text-2xl font-bold">
                      {craftsman.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition mb-8"
                  onClick={() => setIsModalOpen(true)}
                >
                  قيّم الصنايعي الآن!
                </button>
                
                {ratings.length > 0 ? (
                  ratings.map((rating, index) => (
                    <div key={rating.id} className={index !== 0 ? 'mt-6 pt-6 border-t border-gray-200' : ''}>
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                          {rating.reviewerImage ? (
                            <img src={rating.reviewerImage} alt={rating.reviewerName} className="w-full h-full object-cover" />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          )}
                        </div>
                        <div className="mr-4">
                          <div className="flex items-center">
                            <span className="font-bold text-gray-800">{rating.reviewerName}</span>
                            <span className="text-gray-500 text-sm mr-4">{rating.date}</span>
                          </div>
                          
                          <div className="flex items-center mt-1">
                            <span className="text-gray-800 text-sm mr-2">التقييم:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 mx-0.5 ${i < rating.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600">{rating.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-8">لا توجد تقييمات متاحة</p>
                )}
                
                <div className="mt-8 text-center">
                  <button 
                    className="bg-blue-600 text-white py-2 px-8 rounded-md hover:bg-blue-700 transition"
                    onClick={() => router.push(`/request-craftsman/${id}`)}
                  >
                    طلب الصنايعي
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {craftsman.profileImage ? (
                    <img src={craftsman.profileImage} alt={craftsman.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <span className="font-bold mr-4">{craftsman.fullName}</span>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingValue(star)}
                  className="mx-1 focus:outline-none"
                >
                  <svg 
                    className={`w-8 h-8 ${star <= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            
            <div className="mb-6">
              <textarea
                placeholder="أخبرنا كيف كانت تجربك لتساعد الناس في معرفة أداء الصنايعي"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            
            <button 
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              onClick={handleRatingSubmit}
              disabled={ratingValue === 0}
            >
              إرسال
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeFullscreen}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {selectedImage && (
  <img 
    src={selectedImage} 
    alt="Fullscreen" 
    className="max-w-full max-h-full object-contain"
  />
)}
        </div>
      )}
    </div>
  );
};

export default page;