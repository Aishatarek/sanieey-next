import React from 'react'
import Image from 'next/image';

const page = () => {
    return (
        <div>
            <div className="container-trsh">
              
            <div className="nam"><span>ترشـــيـح صــنايــعــي </span> <img src="/images/Fill 177.svg" alt="" />

</div>
                <div>
                    <p className="p-tarsh">ساعدنا في تطوير شبكتنا المتميزة من الصنايعية ، وأضف صنايعيًا جديدًا اليوم ليتمكن الجميع من الوصول إلى خدمات احترافية بسهولة وثقة عالية.</p>
                </div>
                <section className="sec-trash">
                    <div className="seccm">
                        <h2 className="data-tarsh">بـيــانـات الــصـنــايـعـي:</h2>

                        <div className="input-group02">
                            <div className="name-tr0">
                                <div className="email-1">
                                    <label htmlFor="text-tr"> الاسم الاول</label>
                                    <div className="name-tr">
                                        <img src="/images/user.svg" alt="" />
                                        <input type="text" id="text-tr" placeholder="مثال : ربيع" />
                                    </div>
                                </div>
                            </div>
                            <div className="name-tr0" >
                                <label htmlFor="text-tr"> الاسم الاخير</label>
                                <div className="name-tr">
                                    <img src="/images/user.svg" alt="" />
                                    <input type="text" id="text-tr" placeholder="مثال : ربيع" />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-7 mt-5 new-flex div-select">

<div className="w-full  md:w-6/12 lg:w-6/12 name-0">

    <label htmlFor="Governorate"> محافظة السكن</label>
    <div className="select-sign">
        <select className="dropdown-menu" name="Governorate" id="Governorate" >
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
        <select className="dropdown-menu" name="Location" id="Location" >
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
        <input className="name" type="text" name='Profession' id="Profession" placeholder="المهنة"  />
    </div>
</div>
<div className="w-full  md:w-6/12">
    <div className="xz">
        <label htmlFor="PhoneNumber">رقم الهاتف</label>
        <div className="phone-input">
            <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
            <input type="number" name='PhoneNumber' id="PhoneNumber" placeholder="01018819950"  />
        </div>
    </div>
</div>
</div>
                        <div className="g mt-5">
                            <label className="upload-container" htmlFor="fileInput">
                                <div className="p-cc"> <img src="/images/Image 2.svg" alt="Upload Icon" /></div>
                                <div className="upload-text">اضغط هنا لتحميل صورة شخصية (اختياري)</div>
                                <div className="upload-info">صيغة JPG و PNG فقط - الحد الأقصى (5 ميجابايت)</div>
                                <input type="file" id="fileInput" accept="image/png, image/jpeg" />
                            </label>
                        </div>
                    </div>





                    <div className="seccm d0">
                        <h2 className="data-tarsh">الأعـــمــال الــســابـقــة:</h2>
                        <div className="g">
                            <div className="req-n200">
                                <input type="text" placeholder="هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.: " />
                                <label >وصف الخدمة المطلوبة</label>
                            </div>
                        </div>
                        <div className="g">
                            <div className="input-date"> <input type="date" /></div>
                        </div>
                        <div className="g mt-5">
                            <label className="upload-container" htmlFor="fileInput">
                                <div className="p-cc"> <img src="/images/Image 2.svg" alt="Upload Icon" /></div>
                                <div className="upload-text">اضغط هنا لتحميل صورة شخصية (اختياري)</div>
                                <div className="upload-info">صيغة JPG و PNG فقط - الحد الأقصى (5 ميجابايت)</div>
                                <input type="file" id="fileInput" accept="image/png, image/jpeg" />
                            </label>
                        </div>
                    </div>
                </section>
                <div className="btn-sendd my-5">
                    <button><img src="/images/ArrowLeft.svg" alt="" /><span>إرســــــال</span>  </button>

                </div>





            </div>
        </div>

    )
}

export default page
