'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Swal from 'sweetalert2';


const page = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Governorate: '',
        Location: '',
        ProfessionId: '',
        PhoneNumber: '',
        Email: '',
        Password: '',
        CardImage: null,
        ProfileImage: null
    })

    const [errors, setErrors] = useState({})

    const [professions, setProfessions] = useState([]);


  
    useEffect(() => {
      async function fetchProfessions() {
        try {
          const res = await fetch('https://sani3ywebapiv1.runasp.net/api/Profession');
          const data = await res.json();
          setProfessions(data); 
        } catch (error) {
          console.error('Failed to load professions:', error);
        }
      }
      fetchProfessions();
    }, []);
    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileChange = e => {
        const { name, files } = e.target
        setFormData(prev => ({ ...prev, [name]: files[0] }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setErrors({})

        const data = new FormData()
        Object.entries(formData).forEach(([key, val]) => {
            if (val) data.append(key, val)
        })

        try {
            const response = await fetch(
                'https://sani3ywebapiv1.runasp.net/api/CraftsmanAuth/signup',
                { method: 'POST', body: data }
            )
            const result = await response.json()

            if (response.ok) {
                localStorage.setItem('authToken', result.accessToken);
                localStorage.setItem('role', "Craftsman");
                
                Swal.fire({
                    title: 'تم إنشاء الحساب بنجاح!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "/sanieey-dashboard/main-dashboard";
                });
            } else if (result.errors) {
                setErrors(result.errors)
                const errorMessages = Object.entries(result.errors)
                    .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
                    .join('\n')
                Swal.fire({
                    title: 'خطأ في البيانات',
                    text: errorMessages,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            } else {
                Swal.fire({
                    title: 'حدث خطأ',
                    text: result.message || 'فشل الإرسال',
                    icon: 'error'
                })
            }
        } catch (err) {
            console.error(err)
            Swal.fire({
                title: 'فشل الاتصال',
                text: 'حاول مرة أخرى لاحقاً',
                icon: 'error'
            })
        }
    }
    
    return (
        <>
            <div className="sign-div flex gap-7">
                <div className='w-full md:w-7/12 sm:w-6/12'>

                    <form className="container02 formDiv"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex gap-7 mt-5 new-flex">

                            {['ProfileImage', 'CardImage'].map(name => (
                                <div key={name} className="w-full md:w-6/12">
                                    <label htmlFor={name} className="upload-container">
                                        <div className="p-cc">
                                            <img src="/images/Image 2.svg" alt="Upload Icon" />
                                        </div>
                                        <div className="upload-text">
                                            اضغط هنا لتحميل {name === 'ProfileImage' ? 'صورة شخصية' : 'صورة البطاقة'}
                                        </div>
                                        <div className="upload-info">
                                            صيغة JPG و PNG فقط - الحد الأقصى (5 ميجابايت)
                                        </div>
                                        <input
                                            type="file"
                                            id={name}
                                            name={name}
                                            accept="image/png, image/jpeg"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    {errors[name] && <p className="text-red-500 text-sm">{errors[name].join(', ')}</p>}
                                </div>
                            ))}

                        </div>

                        <div className="flex gap-7 mt-5 new-flex">

                            <div className="w-full  md:w-6/12 name-0">
                                <label htmlFor="FirstName">الاسم الاول</label>
                                <div className="name-1">
                                    <img src="/images/user.svg" alt="" />
                                    <input className="name" type="text" name="FirstName" id="FirstName" placeholder="قم بإدخال اسمك الأول هنا"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full  md:w-6/12 name-0">
                                <label htmlFor="LastName">الاسم الاخير</label>
                                <div className="name-1">
                                    <img src="/images/user.svg" alt="" />
                                    <input className="name" name="LastName" type="text" id="LastName" placeholder="قم بإدخال اسمك الثاني هنا"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="flex gap-7 mt-5 new-flex div-select">

                            <div className="w-full  md:w-6/12 lg:w-6/12 name-0">

                                <label htmlFor="Governorate"> محافظة السكن</label>
                                <div className="select-sign">
                                    <select className="dropdown-menu" name="Governorate" id="Governorate"
                                        onChange={handleChange}
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
                            <div className="w-full   md:w-6/12 lg:w-6/12 name-0">

                                <label htmlFor="Location">المنطقة </label>
                                <div className="select-sign">
                                    <select className="dropdown-menu" name="Location" id="Location"
                                        onChange={handleChange}
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
                            <div className="w-full  md:w-6/12 name-0">
                                <label htmlFor="Profession">المهنة </label>
                                <div className="name-1">
                                    <img src="/images/sms.svg" alt="" />
                                    <select
          className="name"
          name="ProfessionId"
          id="ProfessionId"
          value={formData.ProfessionId}
          onChange={handleChange}
        >
          <option value="">اختر المهنة</option>
          {professions.map(prof => (
            <option key={prof.id} value={prof.id}>
              {prof.name}
            </option>
          ))}
        </select>

                                </div>
                            </div>
                            <div className="w-full  md:w-6/12">
                                <div className="xz">
                                    <label htmlFor="PhoneNumber">رقم الهاتف</label>
                                    <div className="phone-input">
                                        <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                        <input type="text" name='PhoneNumber' id="PhoneNumber" placeholder="01018819950"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-7 mt-5 new-flex">

                            <div className="w-full  md:w-6/12 name-0">
                                <label htmlFor="Email">البريد الإلكتروني</label>
                                <div className="name-1">
                                    <img src="/images/sms.svg" alt="" />
                                    <input className="name" name="Email" type="email" id="Email" placeholder="example@gmail.com"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="w-full  md:w-6/12 name-0">

                                <label htmlFor="Password"> كلمة المرور </label>
                                <div className="name-1">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" name='Password' type="password" id="Password" placeholder="***********"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </div>

                        <button className="btn-mes" type="submit">إنــشــاء الــحســاب</button>
                        <p className='or-p'>
                            ـــــ أو ـــــ
                        </p>

                        <p className='want-sign'>تريد انشاء حساب كصنايعي؟ <Link href="/sign">سجل الان</Link>!</p>
                    </form>
                </div>

                <div className='w-full md:w-5/12 sm:w-6/12 sign-display'>
                    <div className="imgf"><img src="/images/Frame 301.svg" alt="" /></div>
                </div>
            </div>
        </>
    )
}

export default page