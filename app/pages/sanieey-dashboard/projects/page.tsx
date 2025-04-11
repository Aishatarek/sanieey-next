'use client'
import React from 'react'
import Link from 'next/link';

const page = () => {
    return (
        <div className='bg-white'>

            <div className="nam"><span>الـمــلـف الـشخـصـي </span> <img src="/images/Fill 177.svg" alt="" />

            </div>
            <div className="flex flex-wrap gap-4 p-4 bg-white">
                <div className="w-full  md:w-3/12">
                    <div className='personal-container'>

                        <div>
                        <ul className="personal-menu">
                                <Link href="/sanieey-dashboard/main-dashboard">
                                    <li className="btn0 " id="hd" > <svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M11 20.4V4.6C11 3.1 10.36 2.5 8.77 2.5H4.73C3.14 2.5 2.5 3.1 2.5 4.6V20.4C2.5 21.9 3.14 22.5 4.73 22.5H8.77C10.36 22.5 11 21.9 11 20.4Z" />
                                        <path d="M21.5 11.4V4.6C21.5 3.1 20.86 2.5 19.27 2.5H15.23C13.64 2.5 13 3.1 13 4.6V11.4C13 12.9 13.64 13.5 15.23 13.5H19.27C20.86 13.5 21.5 12.9 21.5 11.4Z" />
                                        <path d="M21.5 20.4V17.6C21.5 16.1 20.86 15.5 19.27 15.5H15.23C13.64 15.5 13 16.1 13 17.6V20.4C13 21.9 13.64 22.5 15.23 22.5H19.27C20.86 22.5 21.5 21.9 21.5 20.4Z" />
                                    </svg>لوحة التحكم </li>
                                </Link>

                                <Link href="/sanieey-dashboard/orders">

                                    <li className="btn0 " > <svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path opacity="0.4" d="M21.0406 7.69L12.0006 12.92L2.96063 7.69C3.36063 6.95 3.94063 6.3 4.59063 5.94L9.93063 2.98C11.0706 2.34 12.9306 2.34 14.0706 2.98L19.4106 5.94C20.0606 6.3 20.6406 6.95 21.0406 7.69Z" />
                                        <path opacity="0.6" d="M12.0006 12.9204V22.5004C11.2506 22.5004 10.5006 22.3404 9.93062 22.0204L4.59063 19.0604C3.38063 18.3904 2.39062 16.7104 2.39062 15.3304V9.67043C2.39062 9.03043 2.61062 8.33043 2.96062 7.69043L12.0006 12.9204Z" />
                                        <path d="M21.6106 9.67043V15.3304C21.6106 16.7104 20.6206 18.3904 19.4106 19.0604L14.0706 22.0204C13.5006 22.3404 12.7506 22.5004 12.0006 22.5004V12.9204L21.0406 7.69043C21.3906 8.33043 21.6106 9.03043 21.6106 9.67043Z" />
                                    </svg> إدارة الطلبات </li>
                                </Link>

                                <Link href="/sanieey-dashboard/projects">

                                    <li className="btn0 active" > <svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                        <path opacity="0.4" d="M0.000183105 9.57812C0.0501831 11.9161 0.190183 15.9151 0.210183 16.3561C0.281183 17.2991 0.642183 18.2521 1.20418 18.9241C1.98618 19.8671 2.94918 20.2881 4.29218 20.2881C6.14818 20.2981 8.19418 20.2981 10.1812 20.2981C12.1762 20.2981 14.1122 20.2981 15.7472 20.2881C17.0712 20.2881 18.0642 19.8561 18.8362 18.9241C19.3982 18.2521 19.7592 17.2891 19.8102 16.3561C19.8302 15.9851 19.9302 11.6441 19.9902 9.57812H0.000183105Z" />
                                        <path d="M9.24536 13.8838V15.1778C9.24536 15.5918 9.58136 15.9278 9.99536 15.9278C10.4094 15.9278 10.7454 15.5918 10.7454 15.1778V13.8838C10.7454 13.4698 10.4094 13.1338 9.99536 13.1338C9.58136 13.1338 9.24536 13.4698 9.24536 13.8838Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.21131 13.056C8.11131 13.419 7.7623 13.651 7.38431 13.601C4.8333 13.245 2.39531 12.34 0.337305 10.981C0.126305 10.843 0.000305176 10.607 0.000305176 10.355V6.889C0.000305176 4.789 1.71231 3.081 3.81731 3.081H5.78431C5.97231 1.629 7.20231 0.5 8.70431 0.5H11.2863C12.7873 0.5 14.0183 1.629 14.2063 3.081H16.1833C18.2823 3.081 19.9903 4.789 19.9903 6.889V10.355C19.9903 10.607 19.8633 10.842 19.6543 10.981C17.5923 12.346 15.1443 13.255 12.5763 13.61C12.5413 13.615 12.5073 13.617 12.4733 13.617C12.1343 13.617 11.8313 13.388 11.7463 13.052C11.5443 12.256 10.8213 11.699 9.9903 11.699C9.1483 11.699 8.43331 12.244 8.21131 13.056ZM11.2863 2H8.70431C8.03131 2 7.46931 2.46 7.30131 3.081H12.6883C12.5203 2.46 11.9583 2 11.2863 2Z" />
                                    </svg> الأعمال السابقة</li>
                                </Link>

                                <Link href="/sanieey-dashboard/reviews">

                                    <li className="btn0" ><svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M13.15 15.8699C12.93 15.5499 12.54 15.3699 12.09 15.3699H9.76C9.61 15.3699 9.46 15.3099 9.37 15.1899C9.27 15.0699 9.23 14.9199 9.25 14.7499L9.54 12.8899C9.66 12.3399 9.29 11.7099 8.74 11.5199C8.22 11.3299 7.62 11.5899 7.37 11.9599L5.06 15.3999V14.9699C5.06 14.1299 4.7 13.7899 3.82 13.7899H3.24C2.36 13.7999 2 14.1399 2 14.9799V20.6899C2 21.5299 2.36 21.8699 3.24 21.8699H3.82C4.66 21.8699 5.01 21.5399 5.04 20.7799L6.79 22.1299C7.04 22.3699 7.57 22.4999 7.95 22.4999H10.16C10.92 22.4999 11.68 21.9299 11.86 21.2299L13.26 16.9799C13.41 16.5699 13.37 16.1799 13.15 15.8699Z" />
                                        <path d="M21.1098 3.11047H20.5298C19.6898 3.11047 19.3398 3.44047 19.2998 4.20047L17.5498 2.85047C17.3098 2.61047 16.7698 2.48047 16.3898 2.48047H14.1798C13.4198 2.48047 12.6598 3.05047 12.4798 3.75047L11.0798 8.00047C10.9298 8.41047 10.9798 8.80047 11.1898 9.11047C11.4098 9.43047 11.7998 9.61047 12.2498 9.61047H14.5798C14.7298 9.61047 14.8798 9.67047 14.9698 9.79047C15.0698 9.91047 15.1098 10.0605 15.0898 10.2305L14.7998 12.0905C14.6798 12.6405 15.0498 13.2705 15.5998 13.4605C16.1198 13.6505 16.7198 13.3905 16.9698 13.0205L19.2798 9.58047V10.0105C19.2798 10.8505 19.6398 11.1905 20.5198 11.1905H21.0998C21.9798 11.1905 22.3398 10.8505 22.3398 10.0105V4.28047C22.3498 3.45047 21.9898 3.11047 21.1098 3.11047Z" />
                                    </svg> تقييمات العملاء </li>
                                </Link>

                                <Link href="/sanieey-dashboard/personal-data">

                                    <li className="btn0"><svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M16.19 2.5H7.81C4.17 2.5 2 4.67 2 8.31V16.69C2 19.5 3.29 21.43 5.56 22.16C6.22 22.39 6.98 22.5 7.81 22.5H16.19C17.02 22.5 17.78 22.39 18.44 22.16C20.71 21.43 22 19.5 22 16.69V8.31C22 4.67 19.83 2.5 16.19 2.5ZM20.5 16.69C20.5 18.83 19.66 20.18 17.97 20.74C17 18.83 14.7 17.47 12 17.47C9.3 17.47 7.01 18.82 6.03 20.74H6.02C4.35 20.2 3.5 18.84 3.5 16.7V8.31C3.5 5.49 4.99 4 7.81 4H16.19C19.01 4 20.5 5.49 20.5 8.31V16.69Z" />
                                        <path d="M11.9999 8.5C10.0199 8.5 8.41992 10.1 8.41992 12.08C8.41992 14.06 10.0199 15.67 11.9999 15.67C13.9799 15.67 15.5799 14.06 15.5799 12.08C15.5799 10.1 13.9799 8.5 11.9999 8.5Z" />
                                    </svg>
                                        البيانات الشخصية
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full  md:w-8/12 bg-white">
                        <div className="cv" >

                            <div className="sidebar" id="sidebar" >


                                <div id="info3" className="info-content" >
                                    <div className="lk">
                                        <div className="add-work">
                                            <div className="cx">
                                                <span className="span-add">الأعمال السابقة</span><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M28 14.6668H11.548C13.176 13.0375 14.2133 10.8188 14.2133 8.45345V7.12012H11.5467V8.45345C11.5467 11.7055 8.584 14.6668 5.33333 14.6668H4V17.3335H5.33333C8.584 17.3335 11.5467 20.2948 11.5467 23.5468V24.8801H14.2133V23.5468C14.2133 21.1815 13.176 18.9628 11.548 17.3335H28V14.6668Z" fill="#141522" />
                                                </svg>
                                            </div>
                                            <div>
                                                <button className="btn-pluss"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                                    <path d="M16.5312 9C16.5312 9.22378 16.4424 9.43839 16.2841 9.59662C16.1259 9.75485 15.9113 9.84375 15.6875 9.84375H10.3438V15.1875C10.3438 15.4113 10.2549 15.6259 10.0966 15.7841C9.93839 15.9424 9.72378 16.0312 9.5 16.0312C9.27622 16.0312 9.06161 15.9424 8.90338 15.7841C8.74514 15.6259 8.65625 15.4113 8.65625 15.1875V9.84375H3.3125C3.08872 9.84375 2.87411 9.75485 2.71588 9.59662C2.55764 9.43839 2.46875 9.22378 2.46875 9C2.46875 8.77622 2.55764 8.56161 2.71588 8.40338C2.87411 8.24514 3.08872 8.15625 3.3125 8.15625H8.65625V2.8125C8.65625 2.58872 8.74514 2.37411 8.90338 2.21588C9.06161 2.05764 9.27622 1.96875 9.5 1.96875C9.72378 1.96875 9.93839 2.05764 10.0966 2.21588C10.2549 2.37411 10.3438 2.58872 10.3438 2.8125V8.15625H15.6875C15.9113 8.15625 16.1259 8.24514 16.2841 8.40338C16.4424 8.56161 16.5312 8.77622 16.5312 9Z" fill="white" />
                                                </svg> أضــف عـمــل</button>
                                            </div>


                                            <div className="form-wrapper" id="workForm">
                                                <h3>عمل جديد <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M28 14.6668H11.548C13.176 13.0375 14.2133 10.8188 14.2133 8.45345V7.12012H11.5467V8.45345C11.5467 11.7055 8.584 14.6668 5.33333 14.6668H4V17.3335H5.33333C8.584 17.3335 11.5467 20.2948 11.5467 23.5468V24.8801H14.2133V23.5468C14.2133 21.1815 13.176 18.9628 11.548 17.3335H28V14.6668Z" fill="#141522" />
                                                </svg></h3>
                                                <label >وصف المشروع:</label>
                                                <textarea className="textarea10" id="projectDesc" placeholder="قم بكتابة وصف مشروعك هنا"></textarea>
                                                <p id="descError" className="error">يجب إدخال وصف المشروع</p>
                                                <br /><br />
                                                <label >تاريخ إنجاز المشروع:</label>
                                                <input type="date" id="projectDate" />
                                                <p id="dateError" className="error">يجب إدخال تاريخ المشروع</p>
                                                <br /><br />
                                                <div className="p-c">
                                                    <div className="p-cc">
                                                        <img src="/images/Image 2.svg" alt="" />
                                                    </div>
                                                    <label htmlFor="projectImage" className="p-p">اضغط هنا لرفع صور المشروع (اختياري)</label>
                                                    <input type="file" id="projectImage" accept="image/*" multiple />
                                                    <div className="images-preview" id="imagesPreview"></div>
                                                </div>
                                                <p id="imageError" className="error">يجب رفع صورة واحدة على الأقل</p>
                                                <br />
                                                <button className="action-button"  >إضافة</button>
                                                <div className="modal02" id="successModal02">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="102" height="101" viewBox="0 0 102 101" fill="none">
                                                        <circle cx="51" cy="50.5" r="50.5" fill="#FBC1AC" />
                                                        <circle cx="51" cy="50.5" r="37.5" fill="#ED5B28" />
                                                        <mask id="mask0_773_5600" maskUnits="userSpaceOnUse" x="28" y="28" width="47" height="46">
                                                            <rect x="28.5" y="28" width="46" height="46" fill="#D9D9D9" />
                                                        </mask>
                                                        <g mask="url(#mask0_773_5600)">
                                                            <path d="M47.511 61.793C47.1205 62.1835 46.4873 62.1835 46.0968 61.793L36.586 52.2822C36.1955 51.8916 36.1955 51.2585 36.586 50.868L37.903 49.5509C38.2936 49.1604 38.9267 49.1604 39.3173 49.5509L46.0968 56.3305C46.4873 56.721 47.1205 56.721 47.511 56.3305L63.6822 40.1593C64.0727 39.7687 64.7059 39.7687 65.0964 40.1593L66.4135 41.4763C66.804 41.8668 66.804 42.5 66.4135 42.8905L47.511 61.793Z" fill="white" />
                                                        </g>
                                                    </svg>
                                                    <h3>تم إضافة المشروع بنجاح!</h3>
                                                    <button >العودة إلى الصفحة الرئيسية</button>
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div id="mesd">
                                        <div className="flex-det">
                                            <div className="wrapper-01" >
                                                <div className="bord">
                                                    <div className="content0">
                                                        <div className="wrapper">
                                                            <div className="df" >
                                                                <img id="featuredImg" className="featured-image" src="/images/image 4.png" alt="الصورة الرئيسية" />
                                                                <div className="image-description" id="imgDescription">تفاصيل الصورة هنا</div>
                                                            </div>

                                                            <div className="floating-scroll">
                                                                <div className="thumbnail-gallery" id="thumbnailGallery">
                                                                    <img id="featuredImg" className="featured-image" src="/images/image 4.png" alt="الصورة الرئيسية" />
                                                                    <img src="/images/Billboard_Mockup 1.png" alt="صورة 1" />
                                                                    <img src="/images/Briefcase.png" alt="صورة 2" />
                                                                    <img src="/images/Medal.png" alt="صورة 3" />
                                                                    <img src="/images/Medal.png" alt="صورة 4" />
                                                                    <img src="/images/Medal.png" alt="صورة 5" />
                                                                </div>
                                                            </div>
                                                            <div id="fullscreenOverlay" className="fullscreen-overlay">
                                                                <img id="fullscreenImg" className="fullscreen-image" src="" alt="" />
                                                            </div>

                                                        </div>




                                                    </div>
                                                </div>

                                                <div className="wrapper-0">
                                                    <div className="det-10">
                                                        <span className="span-det0">
                                                            وصف المشروع
                                                        </span>
                                                        <span className="span-det">
                                                            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                                                        </span>
                                                    </div>

                                                    <div className="data-det">
                                                        <span> تاريـخ انـجــاز الـمـشــروع: </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="linc0"><div></div></div>
                                        <div className="wrapper-01" >
                                            <div className="bord">
                                                <div className="content0">
                                                    <div className="wrapper">
                                                        <div className="df" >
                                                            <img id="featuredImg" className="featured-image" src="/images/image 4.png" alt="الصورة الرئيسية" />
                                                            <div className="image-description" id="imgDescription">تفاصيل الصورة هنا</div>
                                                        </div>

                                                        <div className="floating-scroll">
                                                            <div className="thumbnail-gallery" id="thumbnailGallery">
                                                                <img id="featuredImg" className="featured-image" src="/images/image 4.png" alt="الصورة الرئيسية" />
                                                                <img src="/images/Billboard_Mockup 1.png" alt="صورة 1" />
                                                                <img src="/images/Briefcase.png" alt="صورة 2" />
                                                                <img src="/images/Medal.png" alt="صورة 3" />
                                                                <img src="/images/Medal.png" alt="صورة 4" />
                                                                <img src="/images/Medal.png" alt="صورة 5" />
                                                            </div>
                                                        </div>
                                                        <div id="fullscreenOverlay" className="fullscreen-overlay" >
                                                            <img id="fullscreenImg" className="fullscreen-image" src="" alt="" />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="wrapper-0">
                                                <div className="det-10">
                                                    <span className="span-det0">
                                                        وصف المشروع
                                                    </span>
                                                    <span className="span-det">
                                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                                                    </span>
                                                </div>

                                                <div className="data-det">
                                                    <span> تاريـخ انـجــاز الـمـشــروع: </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="linc0"><div></div></div>
                                        <div className="wrapper-01" >
                                            <div className="bord">
                                                <div className="content0">
                                                    <div className="wrapper">
                                                        <div className="df" >
                                                            <img id="featuredImg0" className="featured-image" src="/images/image 4.png" alt="الصورة الرئيسية" />
                                                            <div className="image-description" id="imgDescription">تفاصيل الصورة هنا</div>
                                                        </div>

                                                        <div className="floating-scroll">
                                                            <div className="thumbnail-gallery" id="thumbnailGallery">
                                                                <img id="featuredImg" className="featured-image" src="/images/image 4.png" alt="الصورة الرئيسية" />
                                                                <img src="/images/Billboard_Mockup 1.png" alt="صورة 1" />
                                                                <img src="/images/Briefcase.png" alt="صورة 2" />
                                                                <img src="/images/Medal.png" alt="صورة 3" />
                                                                <img src="/images/Medal.png" alt="صورة 4" />
                                                                <img src="/images/Medal.png" alt="صورة 5" />
                                                            </div>
                                                        </div>
                                                        <div id="fullscreenOverlay" className="fullscreen-overlay" >
                                                            <img id="fullscreenImg" className="fullscreen-image" src="" alt="" />
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="wrapper-0">
                                                <div className="det-10">
                                                    <span className="span-det0">
                                                        وصف المشروع
                                                    </span>
                                                    <span className="span-det">
                                                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
                                                    </span>
                                                </div>

                                                <div className="data-det">
                                                    <span> تاريـخ انـجــاز الـمـشــروع: </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="projectsGallery"></div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
        </div>
    )
}

export default page
