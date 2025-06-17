'use client';

import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

interface Profession {
  id: number;
  name: string;
}

interface FormData {
  CraftsmanFirstName: string;
  CraftsmanLastName: string;
  Governorate: string;
  Location: string;
  PhoneNumber: string;
  ProfessionId: string;
  PreviousWorkDescription: string;
  DateTheProjectDone: string;
  PersonalPhoto: File | null;
  PreviousWorkPictures: File[];
}

const page = () => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    CraftsmanFirstName: '',
    CraftsmanLastName: '',
    Governorate: '',
    Location: '',
    PhoneNumber: '',
    ProfessionId: '',
    PreviousWorkDescription: '',
    DateTheProjectDone: '',
    PersonalPhoto: null,
    PreviousWorkPictures: []
  });

  const [professions, setProfessions] = useState<Profession[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch professions from API
  useEffect(() => {
    async function fetchProfessions() {
      try {
        const res = await fetch('https://sani3ywebapiv1.runasp.net/api/Profession');
        if (!res.ok) {
          throw new Error('Failed to fetch professions');
        }
        const data = await res.json();
        setProfessions(data); 
      } catch (error) {
        console.error('Failed to load professions:', error);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'تعذر تحميل قائمة المهن',
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProfessions();
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload for personal photo
  const handlePersonalPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        PersonalPhoto: e.target.files![0]
      }));
    }
  };

  // Handle file upload for work pictures
  const handleWorkPicturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        PreviousWorkPictures: files
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.CraftsmanFirstName || !formData.CraftsmanLastName || 
        !formData.Governorate || !formData.Location || 
        !formData.PhoneNumber || !formData.ProfessionId) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'الرجاء ملء جميع الحقول المطلوبة',
      });
      return;
    }

    // Validate phone number
    if (!/^01[0125][0-9]{8}$/.test(formData.PhoneNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'رقم الهاتف غير صحيح. يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015 ويتكون من 11 رقمًا',
      });
      return;
    }

    // Prepare form data
    const data = new FormData();
    data.append('CraftsmanFirstName', formData.CraftsmanFirstName);
    data.append('CraftsmanLastName', formData.CraftsmanLastName);
    data.append('Governorate', formData.Governorate);
    data.append('Location', formData.Location);
    data.append('PhoneNumber', formData.PhoneNumber);
    data.append('ProfessionId', formData.ProfessionId);
    
    if (formData.PreviousWorkDescription) {
      data.append('PreviousWorkDescription', formData.PreviousWorkDescription);
    }
    
    if (formData.DateTheProjectDone) {
      data.append('DateTheProjectDone', formData.DateTheProjectDone);
    }
    
    if (formData.PersonalPhoto) {
      data.append('PersonalPhoto', formData.PersonalPhoto);
    }
    
    formData.PreviousWorkPictures.forEach((file) => {
      data.append('PreviousWorkPictures', file);
    });

    try {
      const authToken = localStorage.getItem('authToken');
      
      const response = await fetch('https://sani3ywebapiv1.runasp.net/api/User/recommendCraftsman', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'حدث خطأ أثناء الإرسال');
      }

      await response.json();
      
      Swal.fire({
        icon: 'success',
        title: 'تم بنجاح',
        text: 'تم ترشيح الصنايعي بنجاح!',
      });

      // Reset form after successful submission
      setFormData({
        CraftsmanFirstName: '',
        CraftsmanLastName: '',
        Governorate: '',
        Location: '',
        PhoneNumber: '',
        ProfessionId: '',
        PreviousWorkDescription: '',
        DateTheProjectDone: '',
        PersonalPhoto: null,
        PreviousWorkPictures: []
      });

    } catch (error: unknown) {
      let errorMessage = 'حدث خطأ أثناء إرسال البيانات';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: errorMessage,
      });
    }
  };

  return (
    <div>
      <div className="container-trsh">
        <div className="nam">
          <span>ترشـــيـح صــنايــعــي </span>{" "}
          <img src="/images/Fill 177.svg" alt="" />
        </div>
        <div>
          <p className="p-tarsh">
            ساعدنا في تطوير شبكتنا المتميزة من الصنايعية ، وأضف صنايعيًا جديدًا
            اليوم ليتمكن الجميع من الوصول إلى خدمات احترافية بسهولة وثقة عالية.
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <section className="sec-trash">
            <div className="flex gap-7 mt-5 new-flex">
              <div className="w-full md:w-6/12">
                <div className="seccm">
                  <h2 className="data-tarsh">بـيــانـات الــصـنــايـعـي:</h2>

                  <div className="flex gap-7 mt-5 new-flex div-select">
                    <div className="w-full md:w-6/12 lg:w-6/12 name-0">
                      <label htmlFor="CraftsmanFirstName"> الاسم الاول</label>
                      <div className="name-1">
                        <img src="/images/user.svg" alt="" />
                        <input
                          type="text"
                          className="name"
                          id="CraftsmanFirstName"
                          name="CraftsmanFirstName"
                          value={formData.CraftsmanFirstName}
                          onChange={handleInputChange}
                          placeholder="مثال : ربيع"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-6/12 name-0">
                      <label htmlFor="CraftsmanLastName"> الاسم الاخير</label>
                      <div className="name-1">
                        <img src="/images/user.svg" alt="" />
                        <input
                          type="text"
                          className="name"
                          id="CraftsmanLastName"
                          name="CraftsmanLastName"
                          value={formData.CraftsmanLastName}
                          onChange={handleInputChange}
                          placeholder="مثال : ربيع"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-7 mt-5 new-flex div-select">
                    <div className="w-full md:w-6/12 lg:w-6/12 name-0">
                      <label htmlFor="Governorate"> محافظة السكن</label>
                      <div className="select-sign">
                        <select
                          className="dropdown-menu"
                          name="Governorate"
                          id="Governorate"
                          value={formData.Governorate}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">اختر مدينة</option>
                          <option value="6_october">مدينة 6 أكتوبر</option>
                          <option value="sheikh_zayed">مدينة الشيخ زايد</option>
                          <option value="nasr_city">مدينة نصر</option>
                          <option value="mohandessin">المهندسين</option>
                          <option value="haram">الهرم</option>
                          <option value="agouza">العجوزة</option>
                          <option value="dokki">الدقي</option>
                          <option value="maadi">المعادي</option>
                          <option value="heliopolis">مصر الجديدة</option>
                          <option value="zamalek">الزمالك</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full md:w-6/12 lg:w-6/12 name-0">
                      <label htmlFor="Location">المنطقة </label>
                      <div className="select-sign">
                        <select
                          className="dropdown-menu"
                          name="Location"
                          id="Location"
                          value={formData.Location}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">اختر مدينة</option>
                          <option value="first_district">الحي الأول</option>
                          <option value="second_district">الحي الثاني</option>
                          <option value="third_district">الحي الثالث</option>
                          <option value="downtown">وسط البلد</option>
                          <option value="nile_corniche">كورنيش النيل</option>
                          <option value="sports_city">المدينة الرياضية</option>
                          <option value="university_area">منطقة الجامعات</option>
                          <option value="industrial_zone">المنطقة الصناعية</option>
                          <option value="touristic_area">المنطقة السياحية</option>
                          <option value="residential_area">المنطقة السكنية</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-7 mt-5 new-flex">
                    <div className="w-full md:w-6/12">
                      <div className="xz">
                        <label htmlFor="PhoneNumber">رقم الهاتف</label>
                        <div className="phone-input">
                          <span>
                            +20 <img src="/images/Egypt (EG).svg" alt="" />
                          </span>
                          <input
                            type="tel"
                            name="PhoneNumber"
                            id="PhoneNumber"
                            value={formData.PhoneNumber}
                            onChange={handleInputChange}
                            placeholder="01018819950"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-6/12 name-0">
                      <label htmlFor="ProfessionId">المهنة</label>
                      <div className="select-sign">
                        <select
                          className="dropdown-menu"
                          name="ProfessionId"
                          id="ProfessionId"
                          value={formData.ProfessionId}
                          onChange={handleInputChange}
                          required
                          disabled={loading}
                        >
                          <option value="">{loading ? 'جاري تحميل المهن...' : 'اختر المهنة'}</option>
                          {professions.map((profession) => (
                            <option key={profession.id} value={profession.id}>
                              {profession.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-7 mt-5 new-flex">
                    <div className="w-full md:w-6/12">
                      <div className="g mt-5">
                        <label className="upload-container" htmlFor="PersonalPhoto">
                          <div className="p-cc">
                            <img src="/images/Image 2.svg" alt="Upload Icon" />
                          </div>
                          <div className="upload-text">
                            {formData.PersonalPhoto 
                              ? formData.PersonalPhoto.name 
                              : 'اضغط هنا لتحميل صورة شخصية (اختياري)'}
                          </div>
                          <div className="upload-info">
                            صيغة JPG و PNG فقط - الحد الأقصى (5 ميجابايت)
                          </div>
                          <input
                            type="file"
                            id="PersonalPhoto"
                            name="PersonalPhoto"
                            accept="image/png, image/jpeg"
                            onChange={handlePersonalPhotoChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="w-full md:w-6/12">
                      <div className="g mt-5">
                        <label className="upload-container" htmlFor="PreviousWorkPictures">
                          <div className="p-cc">
                            <img src="/images/Image 2.svg" alt="Upload Icon" />
                          </div>
                          <div className="upload-text">
                            {formData.PreviousWorkPictures.length > 0
                              ? `${formData.PreviousWorkPictures.length} ملف تم اختياره`
                              : 'اضغط هنا لتحميل صور الأعمال السابقة (اختياري)'}
                          </div>
                          <div className="upload-info">
                            صيغة JPG و PNG فقط - الحد الأقصى (5 ميجابايت لكل صورة)
                          </div>
                          <input
                            type="file"
                            id="PreviousWorkPictures"
                            name="PreviousWorkPictures"
                            accept="image/png, image/jpeg"
                            onChange={handleWorkPicturesChange}
                            multiple
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-6/12">
                <div className="seccm d0">
                  <h2 className="data-tarsh">الأعـــمــال الــســابـقــة:</h2>
                  <div className="g">
                    <div className="req-n200">
                      <textarea
                        placeholder="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق."
                        name="PreviousWorkDescription"
                        value={formData.PreviousWorkDescription}
                        onChange={handleInputChange}
                      />
                      <label>وصف الأعمال السابقة</label>
                    </div>
                  </div>
                  <div className="g">
                    <div className="input-date">
                      <input 
                        type="date" 
                        name="DateTheProjectDone"
                        value={formData.DateTheProjectDone}
                        onChange={handleInputChange}
                      />
                      <label>تاريخ إنجاز المشروع</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div className="btn-sendd my-5">
            <button type="submit">
              <img src="/images/ArrowLeft.svg" alt="" />
              <span>إرســــــال</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;