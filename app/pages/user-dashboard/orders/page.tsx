'use client'
import React from 'react'
import Image from 'next/image';
import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";

const page = () => {
    return (
        <>

            <div className="nam"><span>الـمــلـف الـشخـصـي </span> <img src="/images/Fill 177.svg" alt="" />

            </div>
            <div className="flex flex-wrap gap-4 p-4">
                <div className="w-full  md:w-3/12">
                    <div className='personal-container'>
                        <div className='personal-main'>
                            <img src="/images/Ellipse 6.svg" alt="" />
                            <div>
                                <h5>
                                    ربيع احمد
                                </h5>
                                <p>
                                    rabeeahmed2003@gmail.com
                                </p>
                            </div>
                        </div>
                        <div>
                            <ul className="personal-menu">
                                <li><a href="/user-dashboard/personal-data"> <img src="/images/profile-circle.svg" alt="" /><span> البيانات الشخصية </span></a></li>
                                <li><a href="/user-dashboard/orders"  className='active'>  <img src="/images/calendar-tick.svg" alt="" /><span> الطـلـبـات </span></a></li>
                                <li><a href="/user-dashboard/reviews"> <img src="/images/archive-minus.svg" alt="" /><span> التقــيـيـمات  </span></a></li>
                                <li><a href="/user-dashboard/recommend"> <img src="/images/Group 8.svg" alt="" /><span> الصنايعية المرشحين </span> </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full  md:w-8/12">
                    <div className='orders-box'>
                        <div className="nam"><span>الطـــلبــات  </span> <img src="/images/Fill 177.svg" alt="" />
                        </div>

                        <div className='order'>
                            <div className='order-number'>
                                طلب رقم: <span> #0011233 </span>
                            </div>
                            <p className='order-details-p'>
                                المهنة المطلوبة: <span> كهربائي </span>

                            </p>
                            <p className='order-details-p'>
                                اسم الصنايعي: <span> ربيع احمد </span>

                            </p>
                            <div  className='order-content mt-5'>
                            <p>الخدمة المطلوبة:</p>
                            <div>
                                 <p>&ldquo; محتاج صنايعي كهربائي شاطر يعمل شغل الكهربا في البيت كله، من تأسيس الأسلاك لتركيب المفاتيح والبرايز واللوحة، ويكون شغله نظيف وفي الميعاد.&ldquo;</p>

                            </div>
                        </div>
                        <div className="flex justify-around flex-wrap">
                        <p className='order-details-p'>
                                تاريخ الطلب: <span> 7 أكتوبر 2023</span>

                            </p>
                            <p className='order-details-p'>
                                حالة الطلب: <span> تم التنفيذ</span>

                            </p>
                            <div>

                            </div>


                        </div>
                        <button className='btn-submit'>تقـيـيـم الـصـنايـعـي</button>

                        </div>
<div className="border-order"></div>
                
                      
                        <div className='order'>
                            <div className='order-number'>
                                طلب رقم: <span> #0011233 </span>
                            </div>
                            <p className='order-details-p'>
                                المهنة المطلوبة: <span> كهربائي </span>

                            </p>
                            <p className='order-details-p'>
                                اسم الصنايعي: <span> ربيع احمد </span>

                            </p>
                            <div  className='order-content mt-5'>
                            <p>الخدمة المطلوبة:</p>
                            <div>
                                 <p>&ldquo; محتاج صنايعي كهربائي شاطر يعمل شغل الكهربا في البيت كله، من تأسيس الأسلاك لتركيب المفاتيح والبرايز واللوحة، ويكون شغله نظيف وفي الميعاد.&ldquo;</p>

                            </div>
                        </div>
                        <div className="flex justify-around flex-wrap">
                        <p className='order-details-p'>
                                تاريخ الطلب: <span> 7 أكتوبر 2023</span>

                            </p>
                            <p className='order-details-p'>
                                حالة الطلب: <span> تم التنفيذ</span>

                            </p>
                            <div>

                            </div>


                        </div>
                        <button className='btn-submit'>تقـيـيـم الـصـنايـعـي</button>

                        </div>
<div className="border-order"></div>
                        <div className='order'>
                            <div className='order-number'>
                                طلب رقم: <span> #0011233 </span>
                            </div>
                            <p className='order-details-p'>
                                المهنة المطلوبة: <span> كهربائي </span>

                            </p>
                            <p className='order-details-p'>
                                اسم الصنايعي: <span> ربيع احمد </span>

                            </p>
                            <div  className='order-content mt-5'>
                            <p>الخدمة المطلوبة:</p>
                            <div>
                                 <p>&ldquo; محتاج صنايعي كهربائي شاطر يعمل شغل الكهربا في البيت كله، من تأسيس الأسلاك لتركيب المفاتيح والبرايز واللوحة، ويكون شغله نظيف وفي الميعاد.&ldquo;</p>

                            </div>
                        </div>
                        <div className="flex justify-around flex-wrap">
                        <p className='order-details-p'>
                                تاريخ الطلب: <span> 7 أكتوبر 2023</span>

                            </p>
                            <p className='order-details-p'>
                                حالة الطلب: <span> تم التنفيذ</span>

                            </p>
                            <div>

                            </div>


                        </div>
                        <button className='btn-submit'>تقـيـيـم الـصـنايـعـي</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
