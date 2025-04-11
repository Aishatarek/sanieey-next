'use client'
import Image from "next/image";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const page = () => {

    return (
        <div>

            <div className="contact-1">
                <div className="nam"><span> تــــواصـــل مـــعــنـا </span> <img src="/images/Fill 177.svg" alt="" />
                </div>
                <div className="con-2">إذا كانت لديك أي مشاكل أو إستفسارات لا تتردد في التواصل معنا من خلال النموذج التالي أو من خلال قنوات التواصل الأخرى.</div>
                <div className="con-3">

                    <div className="container02">
                        <div className="name-0">
                            <label htmlFor="name">الاسم</label>
                            <div className="name-1">
                                <img src="/images/user.svg" alt="" />
                                <input className="name" type="text" id="name" placeholder="مثال: ربيع احمد" />
                            </div>
                        </div>
                        <div className="phone-email">

                            <div className="xz">
                                <label htmlFor="phone">رقم الهاتف</label>
                                <div className="phone-input">
                                    <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                    <input type="number" id="phone" placeholder="01018819950" />
                                </div>
                            </div>
                            <div className="name-0">
                                <label htmlFor="name">البريد الإلكتروني</label>
                                <div className="name-1">
                                    <img src="/images/sms.svg" alt="" />
                                    <input className="name" type="text" id="name" placeholder="example@gmail.com " />
                                </div>
                            </div>
                        </div>

                        <div className="area">
                            <label htmlFor="message">محتوى الرسالة</label>
                            <div className="text-area"> <textarea id="message" placeholder="كيف يمكننا مساعدتك؟ اترك رسالتك هنا..."></textarea>
                            </div></div>

                        <button className="btn-mes">إرسال</button>
                    </div>
                    <div className="modal01" id="successModal">
                        <div className="model02">
                            <div><svg xmlns="http://www.w3.org/2000/svg" width="102" height="101" viewBox="0 0 102 101" fill="none">
                                <circle cx="51" cy="50.5" r="50.5" fill="#FBC1AC" />
                                <circle cx="51" cy="50.5" r="37.5" fill="#ED5B28" />
                                <mask id="mask0_657_6149" maskUnits="userSpaceOnUse" x="28" y="28" width="47" height="46">
                                    <rect x="28.5" y="28" width="46" height="46" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_657_6149)">
                                    <path d="M47.511 61.793C47.1205 62.1835 46.4873 62.1835 46.0968 61.793L36.586 52.2822C36.1955 51.8916 36.1955 51.2585 36.586 50.868L37.903 49.5509C38.2936 49.1604 38.9267 49.1604 39.3173 49.5509L46.0968 56.3305C46.4873 56.721 47.1205 56.721 47.511 56.3305L63.6822 40.1593C64.0727 39.7687 64.7059 39.7687 65.0964 40.1593L66.4135 41.4763C66.804 41.8668 66.804 42.5 66.4135 42.8905L47.511 61.793Z" fill="white" />
                                </g>
                            </svg></div>
                            <div> <span>تم الإرســال بنجاح!</span></div>
                            <div> <span>سنرد على رسالتك في اقرب وقت</span></div>
                            <div>
                                <button > <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M17.8132 9.99987C17.8132 10.2485 17.7145 10.487 17.5387 10.6628C17.3628 10.8386 17.1244 10.9374 16.8757 10.9374H5.39136L9.41636 14.9616C9.59248 15.1377 9.69143 15.3766 9.69143 15.6257C9.69143 15.8747 9.59248 16.1136 9.41636 16.2897C9.24024 16.4658 9.00137 16.5648 8.7523 16.5648C8.50323 16.5648 8.26436 16.4658 8.08824 16.2897L2.46324 10.6647C2.37584 10.5776 2.30649 10.4741 2.25917 10.3602C2.21186 10.2462 2.1875 10.124 2.1875 10.0006C2.1875 9.87726 2.21186 9.75509 2.25917 9.64113C2.30649 9.52718 2.37584 9.42368 2.46324 9.33659L8.08824 3.71159C8.17544 3.62438 8.27897 3.55521 8.39291 3.50801C8.50685 3.46081 8.62897 3.43652 8.7523 3.43652C8.87563 3.43652 8.99775 3.46081 9.11169 3.50801C9.22563 3.55521 9.32916 3.62438 9.41636 3.71159C9.50357 3.79879 9.57275 3.90232 9.61994 4.01626C9.66714 4.1302 9.69143 4.25232 9.69143 4.37565C9.69143 4.49898 9.66714 4.6211 9.61994 4.73504C9.57275 4.84898 9.50357 4.95251 9.41636 5.03971L5.39136 9.06237H16.8757C17.1244 9.06237 17.3628 9.16114 17.5387 9.33696C17.7145 9.51277 17.8132 9.75123 17.8132 9.99987Z" fill="white" />
                                </svg>العودة إلى الصفحة الرئيسية</button></div>
                        </div>

                    </div>


                    <div className="imgf"><img src="/images/Frame 301.svg" alt="" /></div>
                </div>
                <div className="con-4">
                    <div className="cill-1">
                        <div className="span-1"> <span>الأســئـلـــة الــشــائـــعــة</span></div>
                        <div className="span-2"> <span>أهـــــــم الاســــئــلـــــة الـــشــــائـــــــعـــة</span></div>
                        <div className="span-3"> <span>اطلعوا على أهم الأسئلة الشائعة للحصول على إجابات وافية حول خدماتنا وكيفية الاستفادة منها بأفضل شكل.</span></div>
                    </div>
                    <div className="con-5">
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title font-semibold">مــا هــو مــوقـع “صنــايـعي بلس” ومــا الــهــدف مــنه؟</div>
                            <div className="collapse-content text-sm">موقع صنايعي بلس يوفر لك الصنايعي المناسب لاحتياجاتك بناءاً على تقييمات موثوقة وقاعدة بيانات كبيرة تشمل جميع التخصصات لتسهيل عملية الاختيار بدلاً من الانتظار للحصول على توصيات مباشرة.</div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold">لم أجد المهنة أو التخصص الذي أبحث عنه، ماذا أفعل؟</div>
                            <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
                        </div>
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" />
                            <div className="collapse-title font-semibold">نسيت كلمة المرور، ماذا أفعل؟</div>
                            <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default page
