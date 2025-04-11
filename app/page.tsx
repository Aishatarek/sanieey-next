import React from 'react'
import Navbar from "./components/Navbar";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Image from 'next/image';


export default function Home() {
  return (
    <>
      <div className="screen">
        <section className=" container-in overlap m-auto">
          <div className="container grid grid-cols-1 md:grid-cols-2  items-end justify-center ">
            <div className="in-1">


              <p className="p">
                <span className="span">ابحـــــث علـى أفـضـل</span>
                <span className="text-wrapper-5">&nbsp;</span>
                <span className="text-wrapper-6">الصـنايعـية</span>
                <span className="text-wrapper-7">&nbsp;</span>
                <span className="text-wrapper-8">فــي منطـقـتك بسـهـــولـة!</span>
              </p>
              <p className="text-wrapper-9">
                ابحث بين أفضل الصنايعية في منطقتك، قيم خدماتهم، واختر الأنسب بمساعدة تقييمات موثوقة ومعلومات شاملة.
              </p>
              <div className="frame-5">
                <img className="img-2" src="/images/ArrowLeft.svg" alt=""  />
                <div className="text-wrapper-10">ابحــث الان</div>
              </div>
            </div>

            <div className="in-2">
              <img className="image" src="/images/image 1.png" alt="" />
              <img className="frame-6" src="/images/Frame 17.svg" alt="" />
            </div>

          </div>

        </section>


        <section className="services">

          <div className="text-wrapper-11">مـــا يمــيز خــدمتــنا</div>
          <div className="text-wrapper-12">مــا يُـــميــز خـدمتنــا؟</div>
          <div className="dots"></div>
          <div className="component">
            <div className="overlap-2">
              <div className="ellipse"></div>
              <div className="ellipse-2">

              </div>

            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap-2">
              <div className="ellipse"></div>
              <div className="ellipse-2"></div>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="overlap-2">
              <div className="ellipse"></div>
              <div className="ellipse-2"></div>
            </div>
          </div>
          <div className="div-wrapper">
            <div className="overlap-2">
              <div className="ellipse"></div>
              <div className="ellipse-2"></div>
            </div>
          </div>
          <div className="frame-7">
            <div className="div-10">
              <div>  <img className="magnifying-glass" src="/images/Thumbs up.png"alt=""  />
                <div className="text-wrapper-19"> تقيـيـمات موثـوقـة</div></div>
              <div>  <p className="text-wrapper-14">
                "تقييمات حقيقية من الجيران والعملاء الذين جربوا خدمات الصنايعية بأنفسهم، لضمان أعلى مستويات الجودة والاحترافية، مما يمنحك الثقة والراحة في اختيار الأنسب لاحتياجاتك."
              </p>
              </div>
            </div>
          </div>
          <div className="frame-8">
            <div className="div-10">
              <div>  <img className="magnifying-glass" src="/images/Medal.png" alt="" />
                <div className="text-wrapper-19">أفضــل الـصنايـعيـة</div></div>
              <div>  <p className="text-wrapper-15">
                "وفرنا لك قائمة كبيرة بأفضل الصنايعية الموثوقين، تم اختيارهم بناءً على تقييمات وآراء حقيقية من العملاء، لضمان حصولك على خدمة عالية الجودة وأداء احترافي يلبي جميع احتياجاتك بكل سهولة وراحة."
              </p>
              </div>
            </div>
          </div>
          <div className="frame-9">
            <div className="div-10">
              <div>  <img className="magnifying-glass" src="/images/Briefcase.png"  alt=""/>
                <div className="text-wrapper-19">تخصصات متنوعة</div></div>
              <div>  <p className="text-wrapper-17">
                "وفرنا لك مجموعة متنوعة من المهن والحرف لتغطية جميع احتياجاتك المنزلية، من الصيانة والإصلاحات إلى التشطيبات والديكور، مع فريق من المتخصصين الموثوقين الذين يضمنون لك الخدمة الأمثل بجودة عالية وسرعة في الأداء."
              </p>
              </div>
            </div>
          </div>
          <div className="frame-10">
            <div className="div-10">
              <div>  <img className="magnifying-glass" src="/images/Magnifying glass.png" alt="" />
                <div className="text-wrapper-19">بحث سهل وسريع</div></div>
              <div>  <p className="text-wrapper-20">
                ابحث عن صنايعية في منطقتك بكل سهولة لضمان الوصول اليهم في اسرع وقت مع ميزة البحث السريع بالذكاء الاصطناعي
                في ثوانٍ!
              </p>
              </div>
            </div>
          </div>
          <img className="line" src="/images/line-2.svg" alt="" />
        </section>
        <section>
          <div className="component-wrapper">
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
          </div>

          <div className="overlap-4 mt-10">
            <div className="text-wrapper-22">التخصصات الأكثر طلباً</div>
            <div className="text-wrapper-24">التخصصات الأكثر طلباً</div>
          </div>
          <div className="frame-022">
            <div className="frame-023 grid grid-cols-1 md:grid-cols-5 ">
              <div className="frame-22">
                <div className="img-3"> <img src="/images/Magnifying glass.png" alt="" /></div>
                <div> <span className="text-wrapper-52">نــقـاش</span></div>
              </div>
              <div className="frame-22">
                <div className="img-3"> <img src="/images/Magnifying glass.png" alt="" /></div>
                <div> <span className="text-wrapper-52">نــقـاش</span></div>
              </div>
              <div className="frame-22">
                <div className="img-3"> <img src="/images/Magnifying glass.png" alt="" /></div>
                <div> <span className="text-wrapper-52">نــقـاش</span></div>
              </div>
              <div className="frame-22">
                <div className="img-3"> <img src="/images/Magnifying glass.png" alt="" /></div>
                <div> <span className="text-wrapper-52">نــقـاش</span></div>
              </div>
              <div className="frame-22">
                <div className="img-3"> <img src="/images/Magnifying glass.png" alt="" /></div>
                <div> <span className="text-wrapper-52">نــقـاش</span></div>
              </div>






            </div>
          </div>
          <div className="frame-110">
            <div className="frame-11">
              <img className="img-2" src="/images/ArrowLeft.svg"  alt=""/>
              <div className="text-wrapper-21">كل التخصصات</div>
            </div>
          </div>
        </section>



        <section>
          <div className="overlap-3">
            <div className="text-wrapper-22">الصنايعية الأكثر طلباً</div>
            <div className="text-wrapper-23">الصنايعية الأكثر طلباً</div>
          </div>
          <div className="frame-280  grid grid-cols-1 md:grid-cols-4">

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
          <div className="frame-120">
            <div className="frame-12">
              <img className="img-2" src="/images/ArrowLeft.svg" alt="" />
              <div className="text-wrapper-21">كل الصنايعية</div>
            </div>
          </div>
        </section>


        <section className="container flex  gap-4 p-4  justify-between search-section">

<div className="w-full  md:w-6/12">
          <div className="frame-36 ">
            <img className="freepik-edit" src="/images/freepik_edit (1) 2.png" alt="" />
            <div className="overlap-9">
              <img className="star-3" src="/images/Star 13.svg" alt="" /> <img className="star-4" src="/images/Star 12.svg"  alt="" />
            </div>
            <img className="star-5" src="/images/Star 11.svg" alt="" />
          </div>
          </div>
          <div className=" w-full  md:w-6/12">
            <div className="flex  gap-4 my-24">
              <div className="group-12">
                <div className="overlap-10">
                  <div className="text-wrapper-63">1</div>
                </div>
              </div>

              <div className="overlap-11">
                <div className="text-wrapper-65">ابدأ البحث</div>
                <p className="text-wrapper-66">استخدم فلاتر البحث للحصول على الصنايعية حسب المهنة ، المنطقة , التقييم.</p>
              </div>
            </div>
            <div className="flex  gap-4  mt-15">
              <div className="group-12">
                <div className="overlap-10">
                  <div className="text-wrapper-63">2</div>
                </div>
              </div>

              <div className="overlap-11">
                <div className="text-wrapper-65">اختر صنايعي مناسب</div>
                <p className="text-wrapper-66">
                  قارن بين الصنايعية بناءاً على تقييماتهم , ومناطق وجودهم واختر الشخص المناسب لاحتياجك.
                </p>
              </div>
            </div>
            <div className="flex  gap-4  my-24" >
              <div className="group-12">
                <div className="overlap-10">
                  <div className="text-wrapper-63">3</div>
                </div>
              </div>

              <div className="overlap-11">
                <div className="text-wrapper-65">ابدأ البحث</div>
                <p className="text-wrapper-66">
                  بعد إنجاز المهمه، قيّم الصنايعي بناءاً على تجربتك وأضف صنايعية اخرين تعرفهم لمساعدة الآخرين.
                </p>
              </div>
            </div>

          </div>
        </section>
        <section>
          <div className="frame-37 ">
            <div className="overlap-14">
              <img className="element-render-spaceman"
                src="/images/3d-render-spaceman-astronaut-jumping-3d-illustration-design 1.png" alt="" />
              <div className="text-stars">
                <p className="text-wrapper-70">جــرب ميزة البحث السريع بالذكاء الاصطناعي الآن..!</p>
                <div className="star-text">
                  <img className="star-6" src="/images/Star 14.svg" alt=""/>
                  <p className="text-wrapper-71">قم بوضع صوره لما تريده وسنقوم بترشيح الصنايعي المناسب لك في ثوانٍ..!</p>
                </div>
                <div className="star-text">
                  <img className="star-6" src="/images/Star 14.svg"alt="" />
                  <p className="text-wrapper-71">
                    أو قم بكتابة وصف مختصر جدا لما تريده وسنقوم بترشيح الصنايعي المناسب لك في ثوانٍ..!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="component-wrapper">
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" alt="" />
            <img src="/images/Star 15.svg" alt="" />
          </div>
        </section>
        <section>
          <div className="overlap-5">
            <div className="text-wrapper-25">آراء العــملاء</div>
            <div className="text-wrapper-26">مـــا الـــذي يـــقــولـــه عــمـــلائـــنـا؟</div>

            <div className="dots-px"></div>

            <Reviews />


            <div className="frame-15  grid grid-cols-1 md:grid-cols-3 mt-5 items-end justify-center ">
              <div className="fs1">
                <div><img src="/images/3dicons-rocket-dynamic-color.png" alt="" /></div>
                <div className="counter" id="counter1"><span>+</span> 0</div>
                <p>زيارة للموقع</p>
              </div>
              <div className="fs1">
                <div><img src="/images/3dicons-sheild-dynamic-color.png" alt="" /></div>
                <div className="counter" id="counter2"><span>+</span> 0</div>
                <p> صنايعي مُسجل لدينا</p>
              </div>
              <div className="fs1">
                <div><img src="/images/3dicons-target-dynamic-color.png" alt="" /></div>
                <div className="counter" id="counter3"><span>+</span> 0</div>
                <p> مستفيد من خدمتنا</p>
              </div>
            </div>

          </div>
        </section>

      </div>

    </>
  );
}
