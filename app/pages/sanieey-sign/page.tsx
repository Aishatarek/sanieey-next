'use client'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";
import Swal from 'sweetalert2';

const page = () => {
    // const [formData, setFormData] = useState({
    //     FirstName: "",
    //     LastName: "",
    //     Governorate: "",
    //     Location: "",
    //     Profession: "",
    //     PhoneNumber: "",
    //     Email: "",
    //     Password: "",
    //     CardImage: "",
    //     ProfileImage: ""
    // })

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value })
    // }

    // const handleFileChange = async (e, field) => {
    //     const file = e.target.files[0]
    //     if (file) {
    //         const reader = new FileReader()
    //         reader.onloadend = () => {
    //             setFormData({ ...formData, [field]: reader.result.split(',')[1] })
    //         }
    //         reader.readAsDataURL(file)
    //     }
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await fetch("http://sani3ywebapiv1.runasp.net/api/Craftsman/signup", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(formData)
    //         })

    //         const result = await response.json()
    //         if (response.ok) {
    //                             Swal.fire({ title: "تم إنشاء الحساب بنجاح!", icon: 'success', confirmButtonText: 'OK' });
                
    //         } else {
    //             alert("حدث خطأ: " + result.message)
    //         }
    //     } catch (error) {
    //         console.error("Error:", error)
    //         alert("فشل التسجيل، حاول مرة أخرى.")
    //     }
    // }

    return (
        <>
            <div className="sign-div flex gap-7">
                <div className='w-full md:w-7/12 sm:w-6/12'>

                    <form className="container02 formDiv" 
                    // onSubmit={handleSubmit}
                    >
                        <div className="flex gap-7 mt-5 new-flex">

                            <div className="w-full  md:w-6/12">

                                <div className="g">
                                    <label className="upload-container" htmlFor="fileInput">
                                        <div className="p-cc"> <img src="/images/Image 2.svg" alt="Upload Icon" /></div>
                                        <div className="upload-text">اضغط هنا لتحميل صورة شخصية</div>

                                        <div className="upload-info">صيغة JPG و PNG فقط - الحد الأقصى (5 ميجابايت)</div>
                                        <input type="file" id="fileInput" accept="image/png, image/jpeg" 
                                        // onChange={(e) => handleFileChange(e, "ProfileImage")} 
                                        />
                                    </label>
                                </div>
                            </div>
                            <div className="w-full  md:w-6/12">

                                <div className="g">
                                    <label className="upload-container" htmlFor="fileInput2">
                                        <div className="p-cc"> <img src="/images/Image 2.svg" alt="Upload Icon" /></div>
                                        <div className="upload-text">اضغط هنا لتحميل صورة البطاقة</div>

                                        <div className="upload-info">صيغة JPG و PNG فقط - الحد الأقصى (5 ميجابايت)</div>
                                        <input type="file" id="fileInput2" accept="image/png, image/jpeg"
                                        //  onChange={(e) => handleFileChange(e, "CardImage")}
                                          />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-7 mt-5 new-flex">

                            <div className="w-full  md:w-6/12 name-0">
                                <label htmlFor="FirstName">الاسم الاول</label>
                                <div className="name-1">
                                    <img src="/images/user.svg" alt="" />
                                    <input className="name" type="text" name="FirstName" id="FirstName" placeholder="قم بإدخال اسمك الأول هنا" 
                                    // onChange={handleChange}
                                     />
                                </div>
                            </div>
                            <div className="w-full  md:w-6/12 name-0">
                                <label htmlFor="LastName">الاسم الاخير</label>
                                <div className="name-1">
                                    <img src="/images/user.svg" alt="" />
                                    <input className="name" name="LastName" type="text" id="LastName" placeholder="قم بإدخال اسمك الثاني هنا" 
                                    // onChange={handleChange} 
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="flex gap-7 mt-5 new-flex div-select">

                            <div className="w-full  md:w-6/12 lg:w-6/12 name-0">

                                <label htmlFor="Governorate"> محافظة السكن</label>
                                <div className="select-sign">
                                    <select className="dropdown-menu" name="Governorate" id="Governorate" 
                                    // onChange={handleChange}
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
                                    // onChange={handleChange}
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
                                    <input className="name" type="text" name='Profession' id="Profession" placeholder="المهنة"
                                    //  onChange={handleChange} 
                                     />
                                </div>
                            </div>
                            <div className="w-full  md:w-6/12">
                                <div className="xz">
                                    <label htmlFor="PhoneNumber">رقم الهاتف</label>
                                    <div className="phone-input">
                                        <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                        <input type="number" name='PhoneNumber' id="PhoneNumber" placeholder="01018819950" 
                                        // onChange={handleChange} 
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
                                    //  onChange={handleChange}
                                      />
                                </div>
                            </div>
                            <div className="w-full  md:w-6/12 name-0">

                                <label htmlFor="Password"> كلمة المرور </label>
                                <div className="name-1">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" name='Password' type="password" id="Password" placeholder="***********"
                                    //  onChange={handleChange}
                                      />
                                </div>
                            </div>

                        </div>

                        <button className="btn-mes" type="submit">إنــشــاء الــحســاب</button>
                        <p className='or-p'>
                            ـــــ أو ـــــ
                        </p>

                        <p className='want-sign'>تريد انشاء حساب كصنايعي؟ <a href="#">سجل الان</a>!</p>
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