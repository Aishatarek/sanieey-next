'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const requestNumber = searchParams.get('id')
    
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const authToken = localStorage.getItem('authToken')
                if (!authToken) {
                    router.push('/login')
                    return
                }

                const response = await fetch(
                    `https://sani3ywebapiv1.runasp.net/api/CraftsmanOrders/order-details/${requestNumber}`,
                    {
                        method: 'GET',
                        headers: {
                            'accept': '*/*',
                            'Authorization': `Bearer ${authToken}`
                        }
                    }
                )

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setOrder(data)
            } catch (error) {
                console.error('Error fetching order details:', error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (requestNumber) {
            fetchOrderDetails()
        }
    }, [requestNumber, router])

    const handleAcceptOrder = async () => {
        try {
            const authToken = localStorage.getItem('authToken')
            const response = await fetch(
                `https://sani3ywebapiv1.runasp.net/api/CraftsmanOrders/accept-order/${requestNumber}`,
                {
                    method: 'POST',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${authToken}`
                    }
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            alert('تم قبول الطلب بنجاح')
            router.push('/sanieey-dashboard/orders')
        } catch (error) {
            console.error('Error accepting order:', error)
            alert('حدث خطأ أثناء قبول الطلب')
        }
    }

    const handleRejectOrder = async () => {
        try {
            const authToken = localStorage.getItem('authToken')
            const response = await fetch(
                `https://sani3ywebapiv1.runasp.net/api/CraftsmanOrders/reject-order/${requestNumber}`,
                {
                    method: 'DELETE',
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${authToken}`
                    }
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            alert('تم رفض الطلب بنجاح')
            router.push('/sanieey-dashboard/orders')
        } catch (error) {
            console.error('Error rejecting order:', error)
            alert('حدث خطأ أثناء رفض الطلب')
        }
    }

    if (loading) {
        return (
            <div className="container-trsh">
                <div className="nam">
                    <span>تفاصيل الطلب</span> 
                    <img src="/images/Fill 177.svg" alt="" />
                </div>
                <p className="text-center py-8">جاري تحميل بيانات الطلب...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container-trsh">
                <div className="nam">
                    <span>تفاصيل الطلب</span> 
                    <img src="/images/Fill 177.svg" alt="" />
                </div>
                <p className="text-center py-8 text-red-500">{error}</p>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="container-trsh">
                <div className="nam">
                    <span>تفاصيل الطلب</span> 
                    <img src="/images/Fill 177.svg" alt="" />
                </div>
                <p className="text-center py-8">لا توجد بيانات للطلب</p>
            </div>
        )
    }

    return (
        <div className='container m-auto mt-1.5'>
            <div className="container-trsh">
                <div className="nam">
                    <span>تفاصيل الطلب</span> 
                    <img src="/images/Fill 177.svg" alt="" />
                </div>
                
                <section className="sec-trash my-5">
                    <div className="seccm d0">
                        <div className="g">
                            <div className="req-n200">
                                <input 
                                    type="text" 
                                    value={order.serviceDescription || 'لا يوجد وصف'} 
                                    readOnly
                                />
                                <label>وصف الخدمة المطلوبة</label>
                            </div>
                        </div>
                        
                        <div className="flex gap-7 mt-5 new-flex">
                            <div className="w-full md:w-6/12">
                                <div className="g">
                                    <div className="req-n200">
                                        <input 
                                            type="text" 
                                            value={order.location || 'لا يوجد عنوان'} 
                                            readOnly
                                        />
                                        <label>العـنـــوان</label>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-6/12">
                                <div className="g">
                                    <div className="req-n200">
                                        <div className="input-date">
                                            <input 
                                                type="text" 
                                                value={new Date(order.startDate).toLocaleDateString('ar-EG') || 'لا يوجد تاريخ'} 
                                                readOnly
                                            />
                                        </div>
                                        <label>التاريخ</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-7 mt-5 new-flex">
                            <div className="w-full md:w-6/12">
                                <div className="bord">
                                    <div className="content0">
                                        <div className="wrapper">
                                            <div className="df">
                                                {order.malfunctionPictures && order.malfunctionPictures.length > 0 ? (
                                                    <>
                                                        <img 
                                                            id="featuredImg" 
                                                            className="featured-image" 
                                                            src={order.malfunctionPictures[0]} 
                                                            alt="الصورة الرئيسية" 
                                                        />
                                                        <div className="image-description" id="imgDescription">
                                                            صور الأعطال المبلغ عنها
                                                        </div>
                                                        
                                                        <div className="floating-scroll">
                                                            <div className="thumbnail-gallery" id="thumbnailGallery">
                                                                {order.malfunctionPictures.map((img, index) => (
                                                                    <img 
                                                                        key={index} 
                                                                        src={img} 
                                                                        alt={`صورة ${index + 1}`} 
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <p className="text-center py-4">لا توجد صور متاحة</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-6/12">
                                <div className="flex gap-7 mt-5 new-flex">
                                    <div className="w-full md:w-6/12">
                                        <div className="">
                                            <div className="xz">
                                                <label htmlFor="phone">رقم الهاتف</label>
                                                <div className="phone-input">
                                                    <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                                    <input 
                                                        type="text" 
                                                        name='phone' 
                                                        id="phone" 
                                                        value={order.phoneNumber || 'لا يوجد رقم'} 
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="w-full md:w-6/12">
                                        <div className="">
                                            <div className="xz">
                                                <label htmlFor="phone2">رقم هاتف إضافي</label>
                                                <div className="phone-input">
                                                    <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                                    <input 
                                                        type="text" 
                                                        name='phone2' 
                                                        id="phone2" 
                                                        value={order.secondPhoneNumber || 'لا يوجد رقم إضافي'} 
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <p className="order-details-p">
                                        حالة الطلب: <span>
                                            {order.requestStatus === 'WaitingForAcceptance' && 'بانتظار القبول'}
                                            {order.requestStatus === 'Accepted' && 'تم القبول'}
                                            {order.requestStatus === 'Rejected' && 'تم الرفض'}
                                            {order.requestStatus === 'InProgress' && 'قيد التنفيذ'}
                                            {order.requestStatus === 'Completed' && 'مكتمل'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {order.requestStatus === 'WaitingForAcceptance' && (
                    <>
                        <div className="btn-sendd my-5">
                            <button onClick={handleAcceptOrder}>
                                <img src="/images/ArrowLeft.svg" alt="" />
                                <span>موافقه</span>
                            </button>
                        </div>
                        <div className="btn-sendd my-5">
                            <button 
                                style={{ backgroundColor: "red" }} 
                                onClick={handleRejectOrder}
                            >
                                <img src="/images/ArrowLeft.svg" alt="" />
                                <span>رفض</span>
                            </button>
                        </div>
                    </>
                )}
                
                {order.requestStatus !== 'WaitingForAcceptance' && (
                    <div className="btn-sendd my-5">
                        <Link href="/sanieey-dashboard/orders">
                            <button>
                                <img src="/images/ArrowLeft.svg" alt="" />
                                <span>العودة إلى قائمة الطلبات</span>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default page