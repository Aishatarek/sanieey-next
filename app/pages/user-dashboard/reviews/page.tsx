"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Rating {
  craftsmanFullName: string;
  createdAt: string;
  stars: number;
  description: string;
}

const page = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(
          "https://sani3ywebapiv1.runasp.net/api/User/my-ratings",
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ratings");
        }

        const data = await response.json();
        setRatings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("ar-EG", options);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <div key={i}>
          <img
            src={i <= rating ? "/images/Starf.svg" : "/images/Star.svg"}
            alt={i <= rating ? "filled star" : "empty star"}
          />
        </div>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error m-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <>
      <div className="container m-auto">
        <div className="nam">
          <span>الـمــلـف الـشخـصـي </span>
          <img src="/images/Fill 177.svg" alt="" />
        </div>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="w-full md:w-3/12">
            <div className="personal-container">
              <div className='personal-main'>
                <img 
                  src={"https://sani3ywebapiv1.runasp.net"+JSON.parse(localStorage.getItem("userData") || '{}')?.profileImagePath} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/default-profile.png';
                  }}
                />
                <div>
                  <h5>
                    {JSON.parse(localStorage.getItem("userData") || '{}')?.firstName} 
                    {JSON.parse(localStorage.getItem("userData") || '{}')?.lastName}
                  </h5>
                  <p>{JSON.parse(localStorage.getItem("userData") || '{}')?.email}</p>
                </div>
              </div>
              <div>
                <ul className="personal-menu">
                  <li>
                    <Link href="/user-dashboard/personal-data">
                      <img src="/images/profile-circle.svg" alt="" />
                      <span> البيانات الشخصية </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/orders">
                      <img src="/images/calendar-tick.svg" alt="" />
                      <span> الطـلـبـات </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/reviews" className="active">
                      <img src="/images/archive-minus.svg" alt="" />
                      <span> التقــيـيـمات </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/recommend">
                      <img src="/images/Group 8.svg" alt="" />
                      <span> الصنايعية المرشحين </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12">
            <div className="orders-box">
              <div className="nam">
                <span>التقــيـيـمات</span>
                <img src="/images/Fill 177.svg" alt="" />
              </div>

              {ratings.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg">لا توجد تقييمات متاحة</p>
                </div>
              ) : (
                <div className="m-auto">
                  {ratings.map((rating, index) => (
                    <React.Fragment key={index}>
                      <div className="rating-com">
                        <div className="com-1">
                          <div>
                            <img src="/images/Frame 165.png" alt="" />
                          </div>
                          <div>
                            <div>
                              <span className="com-1-0">
                                {rating.craftsmanFullName}
                              </span>
                            </div>
                            <div>
                              <span className="com-1-1">
                                {formatDate(rating.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="com-2">
                          <div>
                            <span className="com-1-0">التقييم</span>
                          </div>
                          <div className="com-1-2">
                            {renderStars(rating.stars)}
                          </div>
                        </div>
                        <div>
                          <p className="com-1-3">
                            &quot;{rating.description}&quot;
                          </p>
                        </div>
                      </div>
                      {index < ratings.length - 1 && (
                        <div className="linex">
                          <div></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;