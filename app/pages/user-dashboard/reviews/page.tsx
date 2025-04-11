'use client'
import React from 'react'
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
                            <img src="/images/Ellipse 14.svg" alt="" />
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
                                <li><a href="/user-dashboard/orders">  <img src="/images/calendar-tick.svg" alt="" /><span> الطـلـبـات </span></a></li>
                                <li><a href="/user-dashboard/reviews" className='active'> <img src="/images/archive-minus.svg" alt="" /><span> التقــيـيـمات  </span></a></li>
                                <li><a href="/user-dashboard/recommend"> <img src="/images/Group 8.svg" alt="" /><span> الصنايعية المرشحين </span> </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full  md:w-8/12">
                    <div className='orders-box'>
                        <div className="nam"><span>التقــيـيـمات  </span> <img src="/images/Fill 177.svg" alt="" />
                        </div>

                        <div className="m-auto">
                            <div className="rating-com">
                                <div className="com-1">
                                    <div>
                                        <img src="/images/Frame 165.png" alt="" />
                                    </div>
                                    <div>
                                        <div>
                                            <span className="com-1-0">احمد محمد</span>
                                        </div>
                                        <div>
                                            <span className="com-1-1">7 أكتوبر 2023</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="com-2">
                                    <div>
                                        <span className="com-1-0">التقييم</span>
                                    </div>
                                    <div className="com-1-2">
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Star.svg" alt="" /></div>

                                    </div>
                                </div>
                                <div>
                                    <p className="com-1-3">"تجربة ممتازة ومريحة جدًا! الخدمة منظمة وسهلة الاستخدام، وقد استطعت العثور على الصنايعي المناسب بسرعة. الحرفيين المدرجين في الموقع يتمتعون بالاحترافية، وكان التواصل معهم سلسًا، بالإضافة إلى الالتزام بالمواعيد والجودة العالية في العمل. بالتأكيد أنصح باستخدام هذا الموقع لأي شخص يبحث عن خدمة موثوقة في وقت قصير. شكرًا على التجربة الرائعة!"</p>
                                </div>

                            </div>
                            <div className="linex"><div></div></div>
                            <div className="rating-com">
                                <div className="com-1">
                                    <div>
                                        <img src="/images/Frame 165.png" alt="" />
                                    </div>
                                    <div>
                                        <div>
                                            <span className="com-1-0">احمد محمد</span>
                                        </div>
                                        <div>
                                            <span className="com-1-1">7 أكتوبر 2023</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="com-2">
                                    <div>
                                        <span className="com-1-0">التقييم</span>
                                    </div>
                                    <div className="com-1-2">
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Starf.svg" alt="" /></div>
                                        <div><img src="/images/Star.svg" alt="" /></div>

                                    </div>
                                </div>
                                <div>
                                    <p className="com-1-3">"تجربة ممتازة ومريحة جدًا! الخدمة منظمة وسهلة الاستخدام، وقد استطعت العثور على الصنايعي المناسب بسرعة. الحرفيين المدرجين في الموقع يتمتعون بالاحترافية، وكان التواصل معهم سلسًا، بالإضافة إلى الالتزام بالمواعيد والجودة العالية في العمل. بالتأكيد أنصح باستخدام هذا الموقع لأي شخص يبحث عن خدمة موثوقة في وقت قصير. شكرًا على التجربة الرائعة!"</p>
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
