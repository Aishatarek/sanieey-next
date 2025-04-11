'use client'
import React from 'react'
import Link from 'next/link';


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
                                <li><Link href="/user-dashboard/personal-data"   className='active'> <img src="/images/profile-circle.svg" alt="" /><span> البيانات الشخصية </span></Link></li>
                                <li><Link href="/user-dashboard/orders">  <img src="/images/calendar-tick.svg" alt="" /><span> الطـلـبـات </span></Link></li>
                                <li><Link href="/user-dashboard/reviews"> <img src="/images/archive-minus.svg" alt="" /><span> التقــيـيـمات  </span></Link></li>
                                <li><Link href="/user-dashboard/recommend"> <img src="/images/Group 8.svg" alt="" /><span> الصنايعية المرشحين </span> </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full  md:w-8/12">
                <div className='orders-box'>

                    <div className="tabs tabs-box">
                        <input type="radio" name="my_tabs_6" className="tab personal_tab_1" aria-label="بيــانــات الــحــسـاب" defaultChecked />
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <form>
                                <div className='edit-image'>
                                    <label htmlFor='image-file'>
                                        <img src="/images/Ellipse 6.svg" alt="" className='personal-image' />
                                        <img src="/images/Frame 331.svg" alt="" className='change-image' />

                                    </label>
                                    <input type="file" id='image-file' />
                                </div>
                                <div className="flex gap-7">
                                    <div className="pers-input-div  ">
                                        <label htmlFor="name">الاسم الاول</label>
                                        <div className="pers-div">
                                            <img src="/images/user.svg" alt="" />
                                            <input className="name" type="text" id="name" placeholder="ربيع" value="ربيع" />
                                        </div>
                                    </div>
                                    <div className="pers-input-div">
                                        <label htmlFor="name">الاسم الأخير</label>
                                        <div className="pers-div">
                                            <img src="/images/user.svg" alt="" />
                                            <input className="name" type="text" id="name" placeholder="احمد" value="احمد" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-7  mt-7">

                                    <div className="pers-input-div">
                                        <label htmlFor="name">البريد الإلكتروني</label>
                                        <div className="pers-div">
                                            <img src="/images/user.svg" alt="" />
                                            <input className="name" type="text" id="name" placeholder="rabeeahmed2003@gmail.com" value="rabeeahmed2003@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="pers-input-div">
                                            <div className="xz">
                                                <label htmlFor="phone">رقم الهاتف</label>
                                                <div className="phone-input">
                                                    <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                                    <input type="number" id="phone" placeholder="01018819950" />
                                        </div>                                       </div>
                                    </div>

                                </div>


                            </form>
                        </div>

                        <input type="radio" name="my_tabs_6" className="tab personal_tab_2" aria-label="أمــان الحــسـاب" />
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <div className="pers-input-div mt-5 ">
                                {/* <label htmlFor="name">الاسم الاول</label> */}
                                <div className="pers-div">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" type="text" id="name" placeholder="كلمة المرور الحالية" />
                                </div>
                            </div>
                            <div className="pers-input-div  mt-5 ">
                                {/* <label htmlFor="name">الاسم الاول</label> */}
                                <div className="pers-div">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" type="text" id="name" placeholder="كلمة المرور الجديدة" />
                                </div>
                            </div>
                            <div className="pers-input-div  mt-5 ">
                                {/* <label htmlFor="name">الاسم الاول</label> */}
                                <div className="pers-div">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" type="text" id="name" placeholder="تأكيد كلمة المرور الجديدة" />
                                </div>
                            </div>




                        </div>

                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
