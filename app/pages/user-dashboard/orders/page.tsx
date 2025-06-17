'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

interface Order {
  id: string
  requestNumber: string
  craftsmanProfession: string
  craftsmanFullName: string
  serviceDescription: string
  orderDate: string
  orderStatus: number
}

const OrdersPage = () => {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(
        'https://sani3ywebapiv1.runasp.net/api/User/GetAllUserRequests',
        {
          method: 'GET',
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data = await response.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return 'بانتظار القبول'
      case 1: return 'قيد التنفيذ'
      case 2: return 'مكتمل'
      case 3: return 'ملغي'
      default: return 'غير معروف'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('ar-EG', options)
  }

  const handleEditOrder = (orderId: string) => {
    router.push(`/user-dashboard/edit-order/${orderId}`)
  }

  const handleCancelOrder = async (order: Order) => {
    const result = await Swal.fire({
      title: 'إلغاء الطلب',
      text: `هل أنت متأكد من إلغاء الطلب رقم ${order.requestNumber}؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'تأكيد الإلغاء',
      cancelButtonText: 'إغلاق',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://sani3ywebapiv1.runasp.net/api/ServiceRequest/cancel/${order.requestNumber}`,
          {
            method: 'DELETE',
            headers: {
              'accept': '*/*',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          }
        )

        if (!response.ok) {
          throw new Error('Failed to cancel order')
        }

        await Swal.fire(
          'تم الإلغاء!',
          'تم إلغاء الطلب بنجاح.',
          'success'
        )
        
        fetchOrders()
      } catch (err) {
        Swal.fire(
          'خطأ!',
          err instanceof Error ? err.message : 'Failed to cancel order',
          'error'
        )
      }
    }
  }

  const handleCompleteOrder = async (order: Order) => {
    const result = await Swal.fire({
      title: 'تأكيد إنجاز الطلب',
      text: `هل أنت متأكد من أن الطلب رقم ${order.requestNumber} قد اكتمل؟`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'إتــمــام الـــطـلـــب',
      cancelButtonText: 'إغلاق',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#3085d6',
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://sani3ywebapiv1.runasp.net/api/ServiceRequest/complete/${order.requestNumber}`,
          {
            method: 'PUT',
            headers: {
              'accept': '*/*',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          }
        )

        if (!response.ok) {
          throw new Error('Failed to complete order')
        }

        await Swal.fire(
          'تم التأكيد!',
          'تم تأكيد إنجاز الطلب بنجاح.',
          'success'
        )
        
        fetchOrders()
      } catch (err) {
        Swal.fire(
          'خطأ!',
          err instanceof Error ? err.message : 'Failed to complete order',
          'error'
        )
      }
    }
  }

  const handleRateOrder = async (order: Order) => {
    const { value: formValues } = await Swal.fire({
      title: 'تقييم الصنايعي',
      html:
        `<div class="text-right">
          <p class="mb-4">قم بتقييم خدمة الصنايعي لطلب رقم ${order.requestNumber}</p>
          <div class="rating rating-lg mb-4 flex justify-center">
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" value="1" />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" value="2" />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" value="3" checked />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" value="4" />
            <input type="radio" name="rating" class="mask mask-star-2 bg-orange-400" value="5" />
          </div>
          <textarea id="review-text" class="textarea textarea-bordered w-full" placeholder="اكتب تعليقك هنا..."></textarea>
        </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'إرسال التقييم',
      cancelButtonText: 'إغلاق',
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#3085d6',
      preConfirm: () => {
        const rating = (document.querySelector('input[name="rating"]:checked') as HTMLInputElement)?.value || '3'
        const reviewText = (document.getElementById('review-text') as HTMLTextAreaElement)?.value || ''
        return { rating, reviewText }
      }
    })

    if (formValues) {
      try {
        const response = await fetch(
          `https://sani3ywebapiv1.runasp.net/api/ServiceRequest/rate/${order.requestNumber}`,
          {
            method: 'POST',
            headers: {
              'accept': '*/*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
              stars: parseInt(formValues.rating),
              description: formValues.reviewText
            })
          }
        )

        if (!response.ok) {
          throw new Error('Failed to submit rating')
        }

        await Swal.fire(
          'تم التقييم!',
          'شكراً لتقييمك خدمة الصنايعي.',
          'success'
        )
        
        fetchOrders()
      } catch (err) {
        Swal.fire(
          'خطأ!',
          err instanceof Error ? err.message : 'Failed to submit rating',
          'error'
        )
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error m-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error: {error}</span>
      </div>
    )
  }

  return (
    <>
      <div className="container m-auto">
        <div className="nam">
          <span>الـمــلـف الـشخـصـي </span> 
          <img src="/images/Fill 177.svg" alt="" />
        </div>
        <div className="flex flex-wrap gap-4 p-4">
          <div className="w-full md:w-3/12">
            <div className="personal-container">
              <div className='personal-main'>
                <img src={"https://sani3ywebapiv1.runasp.net"+JSON.parse(localStorage.getItem("userData") || '{}')?.profileImagePath} 
                     alt="Profile" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <h5>{JSON.parse(localStorage.getItem("userData") || '{}')?.firstName} {JSON.parse(localStorage.getItem("userData") || '{}')?.lastName}</h5>
                  <p>{JSON.parse(localStorage.getItem("userData") || '{}')?.email}</p>
                </div>
              </div>
              <div>
                <ul className="personal-menu">
                  <li>
                    <Link href="/user-dashboard/personal-data">
                      <img src="/images/profile-circle.svg" alt="" />
                      <span> البيانات الشخصية </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/orders" className="active">
                      <img src="/images/calendar-tick.svg" alt="" />
                      <span> الطـلـبـات </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/reviews">
                      <img src="/images/archive-minus.svg" alt="" />
                      <span> التقــيـيـمات </span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/user-dashboard/recommend">
                      <img src="/images/Group 8.svg" alt="" />
                      <span> الصنايعية المرشحين </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full md:w-8/12">
            <div className="orders-box">
              <div className="nam">
                <span>الطـــلبــات </span>
                <img src="/images/Fill 177.svg" alt="" />
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg">لا توجد طلبات متاحة</p>
                </div>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order.requestNumber}>
                    <div className="order">
                      <div className="order-number">
                        طلب رقم: <span>{order.requestNumber}</span>
                      </div>
                      <p className="order-details-p">
                        المهنة المطلوبة: <span>{order.craftsmanProfession}</span>
                      </p>
                      <p className="order-details-p">
                        اسم الصنايعي: <span>{order.craftsmanFullName}</span>
                      </p>
                      <div className="order-content mt-5">
                        <p>الخدمة المطلوبة:</p>
                        <div>
                          <p>&ldquo;{order.serviceDescription}&ldquo;</p>
                        </div>
                      </div>
                      <div className="flex justify-around flex-wrap">
                        <p className="order-details-p">
                          تاريخ الطلب: <span>{formatDate(order.orderDate)}</span>
                        </p>
                        <p className="order-details-p">
                          حالة الطلب: <span>{getStatusText(order.orderStatus)}</span>
                        </p>
                      </div>
                      <>
                      {/* حالة 0: WaitingForAcceptance */}
                        {order.orderStatus === 0 && (
                          <div className='flex flex-wrap justify-around w-full mt-1.5'>
                            <button 
                              className="btn btn-primary w-50 mt-0.5"
                              onClick={() => handleCancelOrder(order)}
                            >
                              إلغاء الطلب
                            </button>
                            <button 
                              className="btn btn-primary w-50 mt-0.5"
                              onClick={() => router.push(`/user-dashboard/edit-order?code=${order.requestNumber}`)}
                                >
                              تعديل الطلب
                            </button>
                          </div>
                        )}
                        
                        {/* حالة 1: UnderImplementation */}
                        {order.orderStatus === 1 && (
                          <div className='flex flex-wrap justify-around w-full mt-1.5'>
                            <button 
                              className="btn btn-primary w-50 mt-0.5"
                              onClick={() => handleCancelOrder(order)}
                            >
                              إلغاء الطلب
                            </button>
                            <button 
                              className="btn btn-primary w-50 mt-0.5"
                              onClick={() => router.push(`/user-dashboard/edit-order?code=${order.requestNumber}`)}
                                >
                              تعديل الطلب
                            </button>
                          </div>
                        )}
                        
                        {/* حالة 2: Completed */}
                        {order.orderStatus === 2 && (
                          <div className='flex flex-wrap justify-around w-full mt-1.5'>
                            <button 
                              className="btn btn-primary w-50 mt-0.5"
                              onClick={() => handleCompleteOrder(order)}
                            >
                              إتــمــام الـــطـلـــب
                            </button>
                            <button 
                              className="btn btn-primary w-50 mt-0.5"
                              onClick={() => handleRateOrder(order)}
                            >
                              تقييم الصنايعي
                            </button>
                          </div>
                        )}
                        
                        {/* حالة 3: Canceled */}
                        {order.orderStatus === 3 && (
                          <p className="text-gray-500">هذا الطلب ملغى</p>
                        )}
                      </>
                    </div>
                    <div className="border-order"></div>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersPage