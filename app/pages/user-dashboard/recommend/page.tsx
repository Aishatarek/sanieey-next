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
                <li><a href="/user-dashboard/orders">  <img src="/images/calendar-tick.svg" alt="" /><span> الطـلـبـات </span></a></li>
                <li><a href="/user-dashboard/reviews"  > <img src="/images/archive-minus.svg" alt="" /><span> التقــيـيـمات  </span></a></li>
                <li><a href="/user-dashboard/recommend" className='active'> <img src="/images/Group 8.svg" alt="" /><span> الصنايعية المرشحين </span> </a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full  md:w-8/12">
          <div className='orders-box'>
            <div className="nam"><span>التقــيـيـمات  </span> <img src="/images/Fill 177.svg" alt="" />
            </div>

            <div className="frame-2800  grid grid-cols-1 md:grid-cols-3">

              <div className="frame-28">
                <div className="menu-list-plus">
                  <div className="img-profile"> <img src="/images/Ellipse 6.svg" alt="" /></div>
                  <div className="profile-name">
                    <div><span>ربيع احمد </span></div>
                    <div><img src="/images/verify.svg" alt="" /></div>
                  </div>
                  <div className="work"> <span>كهربائي</span></div>
                  <div className="location">
                    <div><img src="/images/Location.svg" alt="" /></div>
                    <div> <span>مدينة 6 اكتوبر - الجيزة</span></div>
                  </div>
                  <div className="line0">
                    <div className="line0"></div>
                  </div>
                  <div className="rating-div">

                    <div className="ratimg-text">
                      <span>الــتقــييم</span>
                    </div>
                    <div className="riting">
                      <img src="/images/Starf.svg" alt=""/>
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Star.svg" alt=""  />
                      <img src="/images/Star.svg" alt=""  />
                    </div>
                  </div>
                  <div className="more-det"><a href="#">عرض التفاصيل</a></div>

                </div>
              </div>

              <div className="frame-28">
                <div className="menu-list-plus">
                  <div className="img-profile"> <img src="/images/Ellipse 6.svg" alt="" /></div>
                  <div className="profile-name">
                    <div><span>ربيع احمد </span></div>
                    <div><img src="/images/verify.svg" alt="" /></div>
                  </div>
                  <div className="work"> <span>كهربائي</span></div>
                  <div className="location">
                    <div><img src="/images/Location.svg" alt="" /></div>
                    <div> <span>مدينة 6 اكتوبر - الجيزة</span></div>
                  </div>
                  <div className="line0">
                    <div className="line0"></div>
                  </div>
                  <div className="rating-div">

                    <div className="ratimg-text">
                      <span>الــتقــييم</span>
                    </div>
                    <div className="riting">
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Star.svg" alt="" />
                      <img src="/images/Star.svg" alt="" />
                    </div>
                  </div>
                  <div className="more-det"><a href="#">عرض التفاصيل</a></div>

                </div>
              </div>

              <div className="frame-28">
                <div className="menu-list-plus">
                  <div className="img-profile"> <img src="/images/Ellipse 6.svg" alt="" /></div>
                  <div className="profile-name">
                    <div><span>ربيع احمد </span></div>
                    <div><img src="/images/verify.svg" alt="" /></div>
                  </div>
                  <div className="work"> <span>كهربائي</span></div>
                  <div className="location">
                    <div><img src="/images/Location.svg" alt="" /></div>
                    <div> <span>مدينة 6 اكتوبر - الجيزة</span></div>
                  </div>
                  <div className="line0">
                    <div className="line0"></div>
                  </div>
                  <div className="rating-div">

                    <div className="ratimg-text">
                      <span>الــتقــييم</span>
                    </div>
                    <div className="riting">
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Star.svg" alt="" />
                      <img src="/images/Star.svg" alt="" />
                    </div>
                  </div>
                  <div className="more-det"><a href="#">عرض التفاصيل</a></div>

                </div>
              </div>

              <div className="frame-28">
                <div className="menu-list-plus">
                  <div className="img-profile"> <img src="/images/Ellipse 6.svg" alt="" /></div>
                  <div className="profile-name">
                    <div><span>ربيع احمد </span></div>
                    <div><img src="/images/verify.svg" alt="" /></div>
                  </div>
                  <div className="work"> <span>كهربائي</span></div>
                  <div className="location">
                    <div><img src="/images/Location.svg" alt="" /></div>
                    <div> <span>مدينة 6 اكتوبر - الجيزة</span></div>
                  </div>
                  <div className="line0">
                    <div className="line0"></div>
                  </div>
                  <div className="rating-div">

                    <div className="ratimg-text">
                      <span>الــتقــييم</span>
                    </div>
                    <div className="riting">
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Starf.svg" alt="" />
                      <img src="/images/Star.svg" alt="" />
                      <img src="/images/Star.svg" alt="" />
                    </div>
                  </div>
                  <div className="more-det"><a href="#">عرض التفاصيل</a></div>

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
