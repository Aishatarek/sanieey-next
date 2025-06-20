import React from 'react'

const page = () => {
  return (
    <div className='container m-auto mt-10'>
              <div className="nam">
          <span> إعادة تعيين كلمة المرور</span>{" "}
          <img src="/images/Fill 177.svg" alt="" />
        </div>
        <div className=" bg-base-100 border-base-300 p-6">
            <p>
            يرجى إدخال بريدك الإلكتروني المسجل لدينا وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
            </p>
                <div className="container02">
                  <div className=" name-0">
                    <label htmlFor="email">البريد الإلكتروني</label>
                    <div className="name-1">
                      <img src="/images/sms.svg" alt="" />
                      <input
                        className="name"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="example@gmail.com"
                  
                      />
                    </div>
                  </div>


                  <button className="btn-mes" >
                  إرســـــــال
                  </button>
                  <p className="or-p">

                  تأكد من إدخال البريد الإلكتروني المسجل لدينا.
                  <br />
                  إذا لم تتلقَ البريد، تحقق من مجلد الرسائل غير المرغوب فيها.
                  </p>

           

           
                </div>
              </div>

              <div className='after-send'>
<img src="/images/Mailbox.svg" alt="" />
                <p>
                لقد أرسلنا رابطًا إلى بريدك الإلكتروني يمكنك من خلاله إعادة تعيين كلمة المرور الخاصة بك. يرجى التحقق من بريدك واتباع التعليمات.
                </p>
                <button>
                إعادة إرسال الرابط
                </button>
              </div>
    </div>
  )
}

export default page
