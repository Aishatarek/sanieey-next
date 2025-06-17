'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Swal from 'sweetalert2';

const specialties = () => {
  const [professions, setProfessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const token = localStorage.getItem('authToken') 
        const res = await fetch(
          'https://sani3ywebapiv1.runasp.net/api/ExploreProfessions',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        const data = await res.json()
        if (res.ok) {
          setProfessions(data)
        } else {
          Swal.fire('خطأ', data.message || 'فشل جلب التخصصات', 'error')
        }
      } catch (error) {
        console.error(error)
        Swal.fire('خطأ', 'تعذر الاتصال بالخادم', 'error')
      } finally {
        setLoading(false)
      }
    }
    fetchProfessions()
  }, [])

  if (loading) return <p>جاري التحميل...</p>

  return (
    <>
<section>
      <div className="menu-Specialties">
        <div className="nam"><span>قــائمـة الــتخـصصـات</span> <img src="/images/Fill 177.svg" alt="" />
        </div>
        <div className="menu-Specialties0 grid grid-cols-1 md:grid-cols-4 ">
        {professions.map((prof) => (
              <div
                key={prof.id}
                className="Specialties"
              >
                <div>
                  <img
                    src={prof?.imagePath? `https://sani3ywebapiv1.runasp.net${prof?.imagePath}` : '/images/Lightning.png'}
                    width="150px"
                    alt={prof?.name}
                  />
                </div>
                <div>
                  <span className="specialties-name">{prof.name}</span>
                </div>
              </div>
            ))}
          {/* <div className="Specialties">
            <div><img src="/images/Lightning.png" alt="" /></div>
            <div><span className="specialties-name">كـــهربـائــي</span></div>
          </div> */}
        

        </div>
      </div>
      </section>
<section>

      <div className="more-menu">
        <div className="color1"></div>
        <div className="color2"></div>

        <div className="more-menu1">
          <div className="more1">
            <div className="more10"><span>لـــم تــجـــد الــمــهــنــة الـــتــي تــبــحـــث عـــنـــها؟</span></div>
            <div className="more11">
            <img src="/images/Fill 178.svg" alt="" />
            
             <span>أرسل إلينا الآن وسنقوم بإضافتها على الفور!</span> </div>
            <div className="btn-more"> <Link href="/contactus"> تـــواصــل مــعــنـا</Link></div>

          </div>
          <div className="m8">
            <img src="/images/Error.png" alt="" />
          </div>
        </div>
      </div>
      </section>

      <section>

      <div >
        <div className="logoo">
          <div className="component-logo">
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
          </div>
          <div className="component-logo0">
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />
            <img src="/images/Star 15.svg" alt="" />
            <img src="/images/image 4.png" />



          </div>
        </div>
      </div>
      </section>


    </>
  )
}

export default specialties
