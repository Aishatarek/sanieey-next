"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Craftsman {
  craftsmanId: string;
  profileImage: string | null;
  craftsmanFullName: string;
  profession: string;
  location: string;
  avgRating: number;
  isTrusted: boolean;
}

const page = () => {
  const [craftsmen, setCraftsmen] = useState<Craftsman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCraftsmen = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://sani3ywebapiv1.runasp.net/api/Recommendation/user-approved-recommendations`,
          {
            method: "GET",
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Craftsman[] = await response.json();
        setCraftsmen(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        console.error("Fetch error:", err);
        setCraftsmen([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCraftsmen();
  }, []);

  const renderStars = (rating: number) => {
    if (!rating || isNaN(rating)) return null;
    const roundedRating = Math.round(rating);
    return (
      <div className="riting">
        {[1, 2, 3, 4, 5].map((star) => (
          <img
            key={star}
            src={
              star <= roundedRating ? "/images/Starf.svg" : "/images/Star.svg"
            }
            alt={star <= roundedRating ? "filled star" : "empty star"}
            className="w-4 h-4"
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="container m-auto">
        <div className="nam">
          <span>الـمــلـف الـشخـصـي </span>
          <img src="/images/Fill 177.svg" alt="Profile" />
        </div>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="w-full md:w-3/12">
            <div className="personal-container">
              <div className="personal-main">
                <img
                  src={
                    "https://sani3ywebapiv1.runasp.net" +
                    JSON.parse(localStorage.getItem("userData"))?.profileImagePath
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h5>
                    {JSON.parse(localStorage.getItem("userData"))?.firstName}{" "}
                    {JSON.parse(localStorage.getItem("userData"))?.lastName}
                  </h5>
                  <p>{JSON.parse(localStorage.getItem("userData"))?.email}</p>
                </div>
              </div>
              <div>
                <ul className="personal-menu">
                  <li>
                    <Link href="/user-dashboard/personal-data">
                      <img src="/images/profile-circle.svg" alt="Profile" />
                      <span> البيانات الشخصية </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/orders">
                      <img src="/images/calendar-tick.svg" alt="Orders" />
                      <span> الطـلـبـات </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/reviews">
                      <img src="/images/archive-minus.svg" alt="Reviews" />
                      <span> التقــيـيـمات </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/recommend" >
                      <img src="/images/Group 8.svg" alt="Recommendations" />
                      <span> الصنايعية المرشحين </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/approved-recommend" className="active">
                      <img src="/images/Group 8.svg" alt="Recommendations" />
                      <span> الصنايعية المقبولون </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12">
            <div className="orders-box">
              <div className="flex justify-between">
                <div className="w-full md:w-6/12">
                  <div className="nam">
                    <span> الصنايعية المقبولون </span>
                    <img src="/images/Fill 177.svg" alt="Recommended Craftsmen" />
                  </div>
                </div>

                <div className="w-full md:w-6/12">
                  <div className="more-det">
                    <Link
                      href={`/recommend`}
                      className="text-primary hover:underline"
                    >
                      ترشيح جديد
                    </Link>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-10">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : error ? (
                <div className="alert alert-error">
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
                  <span>{error}</span>
                </div>
              ) : craftsmen.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg">لا توجد توصيات معتمدة حالياً</p>
                </div>
              ) : (
                <div className="frame-2800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {craftsmen.map((craftsman) => (
                    <div key={craftsman.craftsmanId} className="frame-28">
                      <div className="menu-list-plus">
                        <div className="img-profile">
                          <img
                            src={
                              craftsman.profileImage
                                ? `https://sani3ywebapiv1.runasp.net${craftsman.profileImage}`
                                : "/images/Ellipse 6.svg"
                            }
                            alt={craftsman.craftsmanFullName}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        </div>
                        <div className="profile-name">
                          <div>
                            <span>
                              {craftsman.craftsmanFullName || "غير معروف"}
                            </span>
                          </div>
                          {craftsman.isTrusted && (
                            <div>
                              <img
                                src="/images/verify.svg"
                                alt="Verified"
                                className="w-5 h-5"
                              />
                            </div>
                          )}
                        </div>
                        <div className="work">
                          <span>{craftsman.profession || "غير محدد"}</span>
                        </div>
                        <div className="location">
                          <div>
                            <img
                              src="/images/Location.svg"
                              alt="Location"
                              className="w-4 h-4"
                            />
                          </div>
                          <div>
                            <span>
                              {craftsman.location || "الموقع غير متوفر"}
                            </span>
                          </div>
                        </div>
                        <div className="line0">
                          <div className="line0"></div>
                        </div>
                        <div className="rating-div">
                          <div className="ratimg-text">
                            <span>الــتقــييم</span>
                          </div>
                          {renderStars(craftsman.avgRating)}
                        </div>
                        <div className="more-det">
                          <Link
                            href={`/craftsman?id=${craftsman.craftsmanId}`}
                            className="text-primary hover:underline"
                          >
                            عرض التفاصيل
                          </Link>
                        </div>
                      </div>
                    </div>
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