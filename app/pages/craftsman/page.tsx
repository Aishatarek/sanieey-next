"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

interface CraftsmanCard {
  profilePicture: string;
  fullName: string;
  profession: string;
  governorate: string;
  location: string;
  averageRating: number;
}

interface PreviousWork {
  projectDescription: string;
  dateProjectDone: string;
  projectPictures: string[];
}

interface Rating {
  profilePicture: string;
  fullName: string;
  dateOfRate: string;
  ratingByStars: number;
  ratingDescription: string;
}

interface RatingDistribution {
  stars: number;
  percentage: number;
}

interface RatingsResponse {
  averageRating: number;
  ratingDistribution: RatingDistribution[];
  ratings: Rating[];
}

interface ServiceRequestForm {
  CraftsmanId: string;
  ServiceDescription: string;
  Address: string;
  StartDate: string;
  PhoneNumber: string;
  SecondPhoneNumber: string;
  ImageFile: File | null;
}

function Page() {
  const [craftsmanId, setCraftsmanId] = useState<string>("");
  const [craftsmanData, setCraftsmanData] = useState<CraftsmanCard | null>(null);
  const [previousWorks, setPreviousWorks] = useState<PreviousWork[]>([]);
  const [ratingsData, setRatingsData] = useState<RatingsResponse | null>(null);
  const [loading, setLoading] = useState({
    card: true,
    works: true,
    ratings: true,
  });
  const [error, setError] = useState({
    card: "",
    works: "",
    ratings: "",
  });
  const [activeTab, setActiveTab] = useState("work");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState<ServiceRequestForm>({
    CraftsmanId: "",
    ServiceDescription: "",
    Address: "",
    StartDate: "",
    PhoneNumber: "",
    SecondPhoneNumber: "",
    ImageFile: null,
  });
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Get craftsman ID from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const id = url.searchParams.get("id");
      if (id) {
        setCraftsmanId(id);
        setRequestForm((prev) => ({ ...prev, CraftsmanId: id }));
      }
    }
  }, []);

  // Fetch craftsman data
  useEffect(() => {
    if (!craftsmanId) return;

    const fetchCraftsmanData = async () => {
      try {
        const response = await fetch(
          `https://sani3ywebapiv1.runasp.net/api/User/craftsman-card/${craftsmanId}`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch craftsman data");

        const data = await response.json();
        setCraftsmanData(data);
        setLoading((prev) => ({ ...prev, card: false }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          card: err instanceof Error ? err.message : "Unknown error",
        }));
        setLoading((prev) => ({ ...prev, card: false }));
      }
    };

    fetchCraftsmanData();
  }, [craftsmanId]);

  // Fetch previous works
  useEffect(() => {
    if (!craftsmanId) return;

    const fetchPreviousWorks = async () => {
      try {
        const response = await fetch(
          `https://sani3ywebapiv1.runasp.net/api/User/craftsman/${craftsmanId}/previous-works`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch previous works");

        const data = await response.json();
        setPreviousWorks(data);
        if (data.length > 0 && data[0].projectPictures.length > 0) {
          setCurrentImage(data[0].projectPictures[0]);
        }
        setLoading((prev) => ({ ...prev, works: false }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          works: err instanceof Error ? err.message : "Unknown error",
        }));
        setLoading((prev) => ({ ...prev, works: false }));
      }
    };

    fetchPreviousWorks();
  }, [craftsmanId]);

  // Fetch ratings
  useEffect(() => {
    if (!craftsmanId) return;

    const fetchRatings = async () => {
      try {
        const response = await fetch(
          `https://sani3ywebapiv1.runasp.net/api/User/${craftsmanId}/ratings`,
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch ratings");

        const data = await response.json();
        setRatingsData(data);
        setLoading((prev) => ({ ...prev, ratings: false }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          ratings: err instanceof Error ? err.message : "Unknown error",
        }));
        setLoading((prev) => ({ ...prev, ratings: false }));
      }
    };

    fetchRatings();
  }, [craftsmanId]);

  const showPage = (page: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setActiveTab(page);
    const buttons = document.querySelectorAll(".button-1, .button-2");
    buttons.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.add("inactive");
    });
    event.currentTarget.classList.remove("inactive");
    event.currentTarget.classList.add("active");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModal2 = () => setIsModal2Open(true);
  const closeModal2 = () => setIsModal2Open(false);
  const openFullscreen = () => setIsFullscreen(true);
  const closeFullscreen = () => setIsFullscreen(false);

  const updateImage = (imgSrc: string) => {
    setCurrentImage(imgSrc);
  };

  const handleRequestFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRequestForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRequestForm((prev) => ({ ...prev, ImageFile: e.target.files![0] }));
    }
  };

  const submitServiceRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !requestForm.ServiceDescription ||
      !requestForm.Address ||
      !requestForm.StartDate ||
      !requestForm.PhoneNumber
    ) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "الرجاء ملء جميع الحقول المطلوبة",
      });
      return;
    }

    if (!/^01[0125][0-9]{8}$/.test(requestForm.PhoneNumber)) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "رقم الهاتف غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقمًا",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("CraftsmanId", requestForm.CraftsmanId);
      formData.append("ServiceDescription", requestForm.ServiceDescription);
      formData.append("Address", requestForm.Address);
      formData.append("StartDate", requestForm.StartDate);
      formData.append("PhoneNumber", requestForm.PhoneNumber);
      if (requestForm.SecondPhoneNumber) {
        formData.append("SecondPhoneNumber", requestForm.SecondPhoneNumber);
      }
      if (requestForm.ImageFile) {
        formData.append("ImageFile", requestForm.ImageFile);
      }

      const response = await fetch(
        "https://sani3ywebapiv1.runasp.net/api/ServiceRequest/new-request",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "حدث خطأ أثناء الإرسال");
      }

      await response.json();

      Swal.fire({
        icon: "success",
        title: "تم بنجاح",
        text: "تم إرسال طلبك بنجاح! سيتواصل معك الصنايعي قريبًا لتأكيد التفاصيل.",
      });

      setRequestSuccess(true);
      setRequestForm({
        CraftsmanId: craftsmanId,
        ServiceDescription: "",
        Address: "",
        StartDate: "",
        PhoneNumber: "",
        SecondPhoneNumber: "",
        ImageFile: null,
      });
    } catch (err: unknown) {
      let errorMessage = "حدث خطأ أثناء إرسال البيانات";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: errorMessage,
      });
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <img
            key={`full-${i}`}
            src="/images/Starf.svg"
            alt="filled star"
            width={20}
            height={20}
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <img
            key={`half-${i}`}
            src="/images/StarHalf.svg"
            alt="half star"
            width={20}
            height={20}
          />
        );
      } else {
        stars.push(
          <img
            key={`empty-${i}`}
            src="/images/Star.svg"
            alt="empty star"
            width={20}
            height={20}
          />
        );
      }
    }

    return <div className="flex">{stars}</div>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="works0">
      <div className="det">
        <span>
          تفاصيل الصنايعي
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42 21.9997H17.322C19.764 19.5557 21.32 16.2277 21.32 12.6797V10.6797H17.32V12.6797C17.32 17.5577 12.876 21.9997 8 21.9997H6V25.9997H8C12.876 25.9997 17.32 30.4417 17.32 35.3197V37.3197H21.32V35.3197C21.32 31.7717 19.764 28.4437 17.322 25.9997H42V21.9997Z"
              fill="#141522"
            />
          </svg>
        </span>
      </div>

      {showRequestForm ? (
        <div className="det-0">
          <div className="det-1">
            <div className="menu-list-plus">
              {loading.card ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : error.card ? (
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
                  <span>{error.card}</span>
                </div>
              ) : craftsmanData ? (
                <>
                  <div className="img-profile">
                    <img
                      src={`https://sani3ywebapiv1.runasp.net${craftsmanData.profilePicture}`}
                      alt={craftsmanData.fullName}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="profile-name">
                    <div>
                      <span>{craftsmanData.fullName}</span>
                    </div>
                    <div>
                    {craftsmanData.isTrusted?
                      <img
                        src="/images/verify.svg"
                        alt="Verified"
                        width={20}
                        height={20}
                      />
                      :null}
                    </div>
                  </div>
                  <div className="work">
                    <span>{craftsmanData.profession}</span>
                  </div>
                  <div className="location">
                    <div>
                      <img
                        src="/images/Location.svg"
                        alt="Location"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <span>
                        {craftsmanData.location} - {craftsmanData.governorate}
                      </span>
                    </div>
                  </div>
                  <div className="line0">
                    <div className="line0"></div>
                  </div>
                  <div className="riting">
                    <div>
                      <span>الــتقــييم</span>
                    </div>
                    {renderStars(craftsmanData.averageRating)}
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="det-2">
            <div className="container-det">
              <div className=" inset-0 bg-white z-50 overflow-y-auto">
                <div className="py-8 px-4">
                  <div className="flex justify-between items-center mb-6">
                  <div className="btn-ruq1">
                  <button
                    className="btn-ruq"
                      onClick={() => {
                        setShowRequestForm(false);
                        setRequestSuccess(false);
                      }}
                    >
                      رجوع
                    </button>
                    </div>
                  </div>

                  {requestSuccess ? (
                    <div className="text-center py-10">
                      <div className="text-green-500 mb-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-24 w-24 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="text-2xl font-semibold mb-4">
                        تم إرسال طلبك بنجاح!
                      </p>
                      <p className="text-lg mb-6">
                        سيتواصل معك الصنايعي قريبًا لتأكيد التفاصيل.
                      </p>
                      <button
                        onClick={() => setShowRequestForm(false)}
                        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark text-lg"
                      >
                        العودة إلى صفحة الصنايعي
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submitServiceRequest}>
                      <section className="sec-trash">
                        <div className="flex gap-7 mt-5 new-flex">
                          <div className="w-full">
                            <div className="seccm">
                              <h2 className="data-tarsh">
                                بيانات الخدمة المطلوبة:
                              </h2>

                              <div className="g mt-5">
                                <div className="req-n200">
                                  <textarea
                                    placeholder="وصف الخدمة المطلوبة بالتفصيل"
                                    name="ServiceDescription"
                                    value={requestForm.ServiceDescription}
                                    onChange={handleRequestFormChange}
                                    required
                                  />
                                  <label>وصف الخدمة المطلوبة</label>
                                </div>
                              </div>

                              <div className="flex gap-7 mt-5 new-flex">
                                <div className="w-full md:w-6/12">
                                  <div className="input-date">
                                    <input
                                      type="date"
                                      name="StartDate"
                                      value={requestForm.StartDate}
                                      onChange={handleRequestFormChange}
                                      required
                                    />
                                    <label>تاريخ البدء المطلوب</label>
                                  </div>
                                </div>
                                <div className="w-full md:w-6/12">
                                  <div className="xz">
                                    <label htmlFor="PhoneNumber">
                                      رقم الهاتف
                                    </label>
                                    <div className="phone-input">
                                      <span>
                                        +20{" "}
                                        <img
                                          src="/images/Egypt (EG).svg"
                                          alt=""
                                        />
                                      </span>
                                      <input
                                        type="tel"
                                        name="PhoneNumber"
                                        id="PhoneNumber"
                                        value={requestForm.PhoneNumber}
                                        onChange={handleRequestFormChange}
                                        placeholder="01018819950"
                                        required
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-7 mt-5 new-flex">
                                <div className="w-full md:w-6/12 name-0">
                                  <label htmlFor="Address">العنوان</label>
                                  <div className="name-1">
                                    <img src="/images/Location.svg" alt="" />
                                    <input
                                      type="text"
                                      className="name"
                                      id="Address"
                                      name="Address"
                                      value={requestForm.Address}
                                      onChange={handleRequestFormChange}
                                      placeholder="ادخل العنوان بالتفصيل"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="w-full md:w-6/12 name-0">
                                  <label htmlFor="SecondPhoneNumber">
                                    رقم هاتف آخر (اختياري)
                                  </label>
                                  <div className="name-1">
                                    <img src="/images/Phone.svg" alt="" />
                                    <input
                                      type="tel"
                                      className="name"
                                      id="SecondPhoneNumber"
                                      name="SecondPhoneNumber"
                                      value={requestForm.SecondPhoneNumber}
                                      onChange={handleRequestFormChange}
                                      placeholder="01018819950"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="g mt-5">
                                <label
                                  className="upload-container"
                                  htmlFor="ImageFile"
                                >
                                  <div className="p-cc">
                                    <img
                                      src="/images/Image 2.svg"
                                      alt="Upload Icon"
                                    />
                                  </div>
                                  <div className="upload-text">
                                    {requestForm.ImageFile
                                      ? requestForm.ImageFile.name
                                      : "اضغط هنا لتحميل صورة للخدمة المطلوبة (اختياري)"}
                                  </div>
                                  <div className="upload-info">
                                    صيغة JPG و PNG فقط - الحد الأقصى (5
                                    ميجابايت)
                                  </div>
                                  <input
                                    type="file"
                                    id="ImageFile"
                                    name="ImageFile"
                                    accept="image/png, image/jpeg"
                                    onChange={handleFileChange}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>

                      <div className="btn-sendd my-8">
                        <button type="submit">
                          <img src="/images/ArrowLeft.svg" alt="" />
                          <span>إرســــــال الطلب</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="det-0">
          <div className="det-1">
            <div className="menu-list-plus">
              {loading.card ? (
                <div className="flex justify-center py-4">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              ) : error.card ? (
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
                  <span>{error.card}</span>
                </div>
              ) : craftsmanData ? (
                <>
                  <div className="img-profile">
                    <img
                      src={`https://sani3ywebapiv1.runasp.net${craftsmanData.profilePicture}`}
                      alt={craftsmanData.fullName}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="profile-name">
                    <div>
                      <span>{craftsmanData.fullName}</span>
                    </div>
                    <div>
                    {craftsmanData.isTrusted?
                      <img
                        src="/images/verify.svg"
                        alt="Verified"
                        width={20}
                        height={20}
                      />
                      :null}
                    </div>
                  </div>
                  <div className="work">
                    <span>{craftsmanData.profession}</span>
                  </div>
                  <div className="location">
                    <div>
                      <img
                        src="/images/Location.svg"
                        alt="Location"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <span>
                        {craftsmanData.location} - {craftsmanData.governorate}
                      </span>
                    </div>
                  </div>
                  <div className="line0">
                    <div className="line0"></div>
                  </div>
                  <div className="riting">
                    <div>
                      <span>الــتقــييم</span>
                    </div>
                    {renderStars(craftsmanData.averageRating)}
                  </div>
                </>
              ) : null}
            </div>
          </div>

          <div className="det-2">
            <div className="container-det">
              <div className="buttons">
                <button
                  id="workBtn"
                  className={`button-1 ${
                    activeTab === "work" ? "active" : "inactive"
                  }`}
                  onClick={(e) => showPage("work", e)}
                >
                  الأعمال السابقة
                </button>
                <button
                  id="reviewsBtn"
                  className={`button-2 ${
                    activeTab === "reviews" ? "active" : "inactive"
                  }`}
                  onClick={(e) => showPage("reviews", e)}
                >
                  التقييمات
                </button>
              </div>

              {/* Previous Works Tab */}
              <div
                id="work"
                className="content"
                style={{ display: activeTab === "work" ? "block" : "none" }}
              >
                {loading.works ? (
                  <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                ) : error.works ? (
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
                    <span>{error.works}</span>
                  </div>
                ) : previousWorks.length === 0 ? (
                  <div className="text-center py-10">
                    <p>لا توجد أعمال سابقة متاحة</p>
                  </div>
                ) : (
                  previousWorks.map((work, index) => (
                    <React.Fragment key={index}>
                      <div className="flex-det">
                        <div className="wrapper-01">
                          <div className="bord">
                            <div className="content0">
                              <div className="wrapper">
                                {work.projectPictures.length > 0 && (
                                  <>
                                    <div
                                      className="df"
                                      style={{ position: "relative" }}
                                    >
                                      <img
                                        className="featured-image"
                                        src={`https://sani3ywebapiv1.runasp.net${work.projectPictures[0]}`}
                                        alt="صورة المشروع"
                                        width={500}
                                        height={300}
                                        onClick={openFullscreen}
                                      />
                                    </div>

                                    <div className="floating-scroll">
                                      <div className="thumbnail-gallery">
                                        {work.projectPictures.map(
                                          (img, imgIndex) => (
                                            <img
                                              key={imgIndex}
                                              src={`https://sani3ywebapiv1.runasp.net${img}`}
                                              alt={`صورة ${imgIndex + 1}`}
                                              width={100}
                                              height={60}
                                              onClick={() =>
                                                updateImage(
                                                  `https://sani3ywebapiv1.runasp.net${img}`
                                                )
                                              }
                                            />
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="wrapper-0">
                          <div className="det-10">
                            <span className="span-det0">وصف المشروع</span>
                            <span className="span-det">
                              {work.projectDescription}
                            </span>
                          </div>
                          <div className="data-det">
                            <span>
                              تاريـخ انـجــاز الـمـشــروع:{" "}
                              {formatDate(work.dateProjectDone)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {index < previousWorks.length - 1 && (
                        <div className="linc">
                          <div></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))
                )}

                <div className="btn-ruq1">
                  <button
                    className="btn-ruq"
                    onClick={() => setShowRequestForm(true)}
                  >
                    طلب الصنايعي
                  </button>
                </div>
              </div>

              {/* Ratings Tab */}
              <div
                id="reviews"
                className="content"
                style={{ display: activeTab === "reviews" ? "block" : "none" }}
              >
                {loading.ratings ? (
                  <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                ) : error.ratings ? (
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
                    <span>{error.ratings}</span>
                  </div>
                ) : ratingsData ? (
                  <>
                    <div className="rating-nmu0">
                      <div className="m9">
                        {ratingsData.ratingDistribution.map((dist) => (
                          <div key={dist.stars} className="rating-nmu">
                            <div>
                              <span className="span-r">{dist.percentage}%</span>
                            </div>
                            <div className="r1">
                              <div
                                className={`r1-${dist.stars}`}
                                style={{ width: `${dist.percentage}%` }}
                              ></div>
                            </div>
                            <div>
                              <span className="span-r">{dist.stars}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="img-r">
                          {renderStars(ratingsData.averageRating)}
                        </div>
                        <div className="num">
                          <span className="num-r">
                            {ratingsData.averageRating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* <button className="btn-r w-full" onClick={openModal}>
                        قــــــيّـم الــصــنـايــعي الآن !
                      </button> */}

                      {isModalOpen && (
                        <>
                          <div
                            className="modal-overlay-r"
                            onClick={closeModal}
                          ></div>
                          <div className="modal-r">
                            <div className="modal-r0">
                              <div>
                                <div>
                                  <img
                                    src={`https://sani3ywebapiv1.runasp.net${
                                      craftsmanData?.profilePicture || ""
                                    }`}
                                    alt={craftsmanData?.fullName || ""}
                                    width={50}
                                    height={50}
                                    className="rounded-full object-cover"
                                  />
                                </div>
                                <div>
                                  <span>{craftsmanData?.fullName}</span>
                                </div>
                              </div>
                              <div>
                                <div className="rating">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star}>
                                      <img
                                        src="/images/Star.svg"
                                        alt={`${star} stars`}
                                        width={20}
                                        height={20}
                                        onClick={() => {
                                          // Handle rating selection
                                        }}
                                      />
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="input-o">
                                <textarea
                                  className="input-o0"
                                  placeholder="أخبرنا كيف كانت تجربك لتساعد الناس في معرفة اداء الصنايعي"
                                />
                              </div>
                              <div className="btn-s">
                                <button
                                  className="btn-send"
                                  onClick={openModal2}
                                >
                                  إرسال
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Reviews List */}
                    {ratingsData.ratings.map((rating, index) => (
                      <React.Fragment key={index}>
                        <div className="rating-com">
                          <div className="com-1">
                            <div>
                              <img
                                src={`https://sani3ywebapiv1.runasp.net${rating.profilePicture}`}
                                alt={rating.fullName}
                                width={50}
                                height={50}
                                className="rounded-full object-cover"
                              />
                            </div>
                            <div>
                              <div>
                                <span className="com-1-0">
                                  {rating.fullName}
                                </span>
                              </div>
                              <div>
                                <span className="com-1-1">
                                  {formatDate(rating.dateOfRate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="com-2">
                            <div>
                              <span className="com-1-0">التقييم</span>
                            </div>
                            <div className="com-1-2">
                              {renderStars(rating.ratingByStars)}
                            </div>
                          </div>
                          <div>
                            <p className="com-1-3">
                              {rating.ratingDescription}
                            </p>
                          </div>
                        </div>

                        {index < ratingsData.ratings.length - 1 && (
                          <div className="linex">
                            <div></div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}

              
                  </>
                ) : (
                  <div className="text-center py-10">
                    <p>لا توجد تقييمات متاحة</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;