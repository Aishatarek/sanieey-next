'use client'
import React, { useState } from 'react'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('https://sani3ywebapiv1.runasp.net/api/UserAuth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        const data = await response.json()
        setError(data.message || 'حدث خطأ أثناء إرسال الطلب')
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container m-auto mt-10'>
      {!isSubmitted ? (
        <>
          <div className="nam">
            <span> إعادة تعيين كلمة المرور</span>{" "}
            <img src="/images/Fill 177.svg" alt="" />
          </div>
          <div className="bg-base-100 border-base-300 p-6">
            <p>
              يرجى إدخال بريدك الإلكتروني المسجل لدينا وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="container02">
                <div className="name-0">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <div className="name-1">
                    <img src="/images/sms.svg" alt="" />
                    <input
                      className="name"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && <div className="text-red-500 mb-4">{error}</div>}

                <button 
                  className="btn-mes" 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري الإرسال...' : 'إرســـــــال'}
                </button>
                <p className="or-p">
                  تأكد من إدخال البريد الإلكتروني المسجل لدينا.
                  <br />
                  إذا لم تتلقَ البريد، تحقق من مجلد الرسائل غير المرغوب فيها.
                </p>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className="after-send text-center">
          <img src="/images/Mailbox.svg" alt="Mailbox" className="mx-auto mb-4" />
          <p className="mb-6">
            لقد أرسلنا رابطًا إلى بريدك الإلكتروني يمكنك من خلاله إعادة تعيين كلمة المرور الخاصة بك. 
            يرجى التحقق من بريدك واتباع التعليمات.
          </p>
          <button 
            className="forget-pass-btn"
            onClick={() => {
              setIsSubmitted(false)
              setEmail('')
            }}
          >
            إعادة إرسال الرابط
          </button>
        </div>
      )}
    </div>
  )
}

export default ForgotPasswordPage