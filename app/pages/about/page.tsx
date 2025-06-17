'use client'
import React, { useEffect, useState } from 'react';

interface Profession {
  professionId: number;
  professionName: string;
  imagePath: string;
}

interface Craftsman {
  userId: string;
  fullName: string;
  profession: string;
  location: string;
  averageRating: number;
  isTrusted: boolean;
}

interface Rating {
  userFullName: string;
  stars: number;
  description: string;
}

interface SummaryData {
  topProfessions: Profession[];
  topCraftsmen: Craftsman[];
  recentRatings: Rating[];
  totalOrders: number;
  totalCraftsmen: number;
}

export default function AboutPage() {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sc_project = 13144200;
    const sc_invisible = 0;
    const sc_security = "b81ab679";
    const scJsHost = "https://";

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      var sc_project=${sc_project}; 
      var sc_invisible=${sc_invisible}; 
      var sc_security="${sc_security}";
      var scJsHost = "${scJsHost}";
    `;
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = scJsHost + 'statcounter.com/counter/counter.js';
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(script2);
    };
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await fetch('https://sani3ywebapiv1.runasp.net/api/Home/summary', {
          headers: {
            'accept': '*/*'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: SummaryData = await response.json();
        setSummaryData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  if (loading) {
    return <div className="loading">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="error">حدث خطأ: {error}</div>;
  }

  return (
    <>
      <div className="aboutus">
        <div className="nam">
          <span>مـــن نــحــــن؟ </span> 
          <img src="/images/Fill 177.svg" alt="" />
        </div>

        <div className="aboutus-group">
          <div className="group1">
            <div className="g1">
              <span> 
                <span className="color-puls">صــنــايــعــي بـلـــس</span> 
                مــــرجـــعــك الأول للـــــعثــور عـــلـى أفـــضــل الـــصــنايـــعـــية فــي منـــطــقــتـك!
              </span>
            </div>
            <div className="g2"> 
              <span>
                نقدم لك منصة صنايعي+ والتي توفر لك الصنايعي المناسب لاحتياجاتك بناءاً على تقييمات موثوقة وقاعدة بيانات كبيرة تشمل جميع التخصصات لتسهيل عملية الاختيار بدلاً من الانتظار للحصول على توصيات مباشرة.
              </span>
            </div>
          </div>
          <div className="aboutus-img1">
            <img src="/images/Billboard_Mockup 1.png" alt="" />
          </div>
        </div>
      </div>

      <div className="frame-15 grid grid-cols-1 md:grid-cols-3 mt-5 items-end justify-center">
        <div className="fs1">
          <div>
            <img src="/images/3dicons-rocket-dynamic-color.png" alt="" />
          </div>
          <div className="counter" id="counter1">
            <span>+</span>
            <img
              className="statcounter"
              src={`https://c.statcounter.com/${13144200}/0/${"b81ab679"}/0/`}
              alt="Web Analytics"
              referrerPolicy="no-referrer-when-downgrade"
              width="30px"
            />
          </div>
          <p>زيارة للموقع</p>
        </div>
        
        <div className="fs1">
          <div>
            <img src="/images/3dicons-sheild-dynamic-color.png" alt="" />
          </div>
          <div className="counter" id="counter2">
            <span>+</span> {summaryData?.totalCraftsmen ?? '--'}
          </div>
          <p> صنايعي مُسجل لدينا</p>
        </div>
        
        <div className="fs1">
          <div>
            <img src="/images/3dicons-target-dynamic-color.png" alt="" />
          </div>
          <div className="counter" id="counter3">
            <span>+</span> {summaryData?.totalOrders ?? '--'}
          </div>
          <p> مستفيد من خدمتنا</p>
        </div>
      </div>
    </>
  )
}