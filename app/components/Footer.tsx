import React from 'react'


const Footer = () => {
  return (
    <footer>
    <div className="container">
      <div className="all-footer">
        <div className="grid grid-cols-1 md:grid-cols-3 mt-5  justify-between ">
          <div className="p-5">
            <img src="/images/Frame 16.svg" alt="" className="logo" />
            <p className="footer-about">منصة صنايعي بلس توفر لك الصنايعي المناسب لاحتياجاتك بناءاً على تقييمات موثوقة وقاعدة بيانات كبيرة تشمل
              جميع التخصصات لتسهيل عملية الاختيار بدلاً من الانتظار للحصول على توصيات مباشرة.</p>
            <div className="social-follow">
              <p>
                تابعنا على مواقع التواصل
              </p>
              <div className="social-icons">
                <div className="social-icon">
                  <a href="#" ><img src="/images/Vector (6).svg" alt="" /></a>
                </div>
                <div className="social-icon">
                  <a href="#" ><img src="/images/Vector (7).svg" alt="" /></a>
                </div>
                <div className="social-icon">
                  <a href="#" ><img src="/images/Vector (8).svg" alt="" /></a>
                </div>
                <div className="social-icon">
                  <a href="#" ><img src="/images/Vector (9).svg" alt="" /></a>
                </div>
              </div>
            </div>

          </div>
          <div className="web-link">
            <h5>
              أقسام الموقع
            </h5>
            <ul>
              <li>
                <a href="#">» الرئيسية</a>
              </li>
              <li>
                <a href="#">» اكتشف التخصصات</a>
              </li>
              <li>
                <a href="#">» قائمة الصنايعية</a>
              </li>
              <li>
                <a href="#">» رشّـح صـنايعي</a>
              </li>
              <li>
                <a href="#">» تواصل معنا</a>
              </li>
              <li>
                <a href="#">» من نحن؟</a>
              </li>
            </ul>
          </div>
          <div className="web-link">
            <h5>
              أقسام الموقع
            </h5>
            <ul>
              <li>
                <img src="/images/call.svg" alt="" />
                +201018819950
              </li>
              <li>
                <img src="/images/mail.svg" alt="" />
                info@sanai3yplus.com
              </li>
              <li>
                <img src="/images/locationfooter.svg" alt="" />
                مدينة 6 أكتوبر - الجيزة
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p> 2025 © - جميع الحقوق محفوظة لموقع صنايعي بلس l تصميم وتنفيذ R.H.Z.M Team</p>
        </div>
      </div>

    </div>
  </footer>
  )
}

export default Footer
