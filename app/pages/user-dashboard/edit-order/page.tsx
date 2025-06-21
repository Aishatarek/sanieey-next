'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Swal from 'sweetalert2'

interface FormDataState {
  serviceDescription: string;
  startDate: string;
  address: string;
  phoneNumber: string;
  secondPhoneNumber: string;
  malfunctionImage: File[];
  craftsmanId: string;
}

interface OrderDetails {
  address: string;
  id: number;
  malfunctionImagePath: string | null;
  phoneNumber: string;
  requestDate: string;
  requestNumber: string;
  secondPhoneNumber: string;
  serviceDescription: string;
  startDate: string;
  status: string;
  craftsmanId?: string;
}

const EditOrderPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const requestCode = searchParams.get('code')
    
    const [formData, setFormData] = useState<FormDataState>({
        id:'',
        serviceDescription: '',
        startDate: '',
        address: '',
        phoneNumber: '',
        secondPhoneNumber: '',
        malfunctionImage: [],
        craftsmanId: ''
    })
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const authToken = localStorage.getItem('authToken')
                if (!authToken) {
                    router.push('/login')
                    return
                }

                if (!requestCode) return

                const response = await fetch(
                    `https://sani3ywebapiv1.runasp.net/api/ServiceRequest/request/${requestCode}`,
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

                const data: OrderDetails = await response.json()
                
                setFormData({
                    id: data.id ,
                    serviceDescription: data.serviceDescription,
                    startDate: data.startDate.split('T')[0],
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    secondPhoneNumber: data.secondPhoneNumber,
                    malfunctionImage: [],
                    craftsmanId: data.craftsmanId || ''
                })
                
                if (data.malfunctionImagePath) {
                    setPreviewImage(`https://sani3ywebapiv1.runasp.net${data.malfunctionImagePath}`)
                }
            } catch (error) {
                console.error('Error fetching order:', error)
                setError(error instanceof Error ? error.message : 'An unknown error occurred')
                await Swal.fire({
                    title: 'خطأ!',
                    text: 'فشل في تحميل بيانات الطلب',
                    icon: 'error',
                    confirmButtonText: 'حسناً'
                })
                router.push('/user-dashboard/orders')
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [requestCode, router])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0]
        const preview = URL.createObjectURL(file)
        setPreviewImage(preview)
        
        setFormData(prev => ({
            ...prev,
            malfunctionImage: [file]
        }))
    }

    const removeImage = () => {
        if (previewImage) {
            URL.revokeObjectURL(previewImage)
            setPreviewImage(null)
        }
        setFormData(prev => ({
            ...prev,
            malfunctionImage: []
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const authToken = localStorage.getItem('authToken')
            if (!authToken) {
                router.push('/login')
                return
            }

            // Get craftsmanId from user data if not provided in order
            const userData = JSON.parse(localStorage.getItem("userData") || '{}')
            const craftsmanId = formData.id || userData.id

            if (!craftsmanId) {
                throw new Error('لا يمكن تحديد معرف الصانع')
            }

            const formDataToSend = new FormData()
            
            formDataToSend.append('ServiceDescription', formData.serviceDescription)
            formDataToSend.append('StartDate', formData.startDate)
            formDataToSend.append('Address', formData.address)
            formDataToSend.append('PhoneNumber', formData.phoneNumber)
            formDataToSend.append('SecondPhoneNumber', formData.secondPhoneNumber)
            formDataToSend.append('CraftsmanId', craftsmanId)
            
            if (formData.malfunctionImage.length > 0) {
                formDataToSend.append('ImageFile', formData.malfunctionImage[0])
            }

            const response = await fetch(
                `https://sani3ywebapiv1.runasp.net/api/ServiceRequest/edit/${requestCode}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    },
                    body: formDataToSend
                }
            )

            if (!response.ok) {
                const errorData = await response.json()
                console.error('API Error:', errorData)
                
                let errorMessage = 'حدث خطأ أثناء تعديل الطلب'
                if (errorData.errors) {
                    errorMessage = Object.values(errorData.errors).flat().join(', ')
                }
                
                throw new Error(errorMessage)
            }

            await Swal.fire({
                title: 'تم التحديث!',
                text: 'تم تعديل الطلب بنجاح',
                icon: 'success',
                confirmButtonText: 'حسناً'
            })
            
            router.push('/user-dashboard/orders')
        } catch (error) {
            console.error('Error updating order:', error)
            await Swal.fire({
                title: 'خطأ!',
                text: error instanceof Error ? error.message : 'حدث خطأ أثناء تعديل الطلب',
                icon: 'error',
                confirmButtonText: 'حسناً'
            })
        }
    }

    if (loading) {
        return (
            <div className="bg-white min-h-screen flex justify-center items-center">
                <div className="flex flex-col items-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4">جاري تحميل بيانات الطلب...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-white min-h-screen flex justify-center items-center">
                <div className="alert alert-error max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-white'>
            <div className="container m-auto">
                <div className="nam">
                    <span>الـمــلـف الـشخـصـي</span> 
                    <img src="/images/Fill 177.svg" alt="" />
                </div>
                
                <div className="flex flex-wrap gap-4 p-4 bg-white">
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
                                    <li>
                    <Link href="/user-dashboard/approved-recommend" >
                      <img src="/images/Group 8.svg" alt="Recommendations" />
                      <span> الصنايعية المقبولون </span>
                    </Link>
                  </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-8/12 bg-white">
                        <div className="orders-box">
                            <div className="nam">
                                <span>تعديل الطلب #{requestCode}</span>
                                <img src="/images/Fill 177.svg" alt="" />
                            </div>

                            <div className="reqw">
                                <form onSubmit={handleSubmit}>
                                    <div className="req-n2">
                                        <textarea 
                                            name="serviceDescription"
                                            value={formData.serviceDescription}
                                            onChange={handleInputChange}
                                            placeholder="وصف الخدمة المطلوبة" 
                                            required
                                            rows={5}
                                        />
                                        <label>وصف الخدمة</label>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="req-n2">
                                            <input 
                                                type="date" 
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <label>تاريخ البدء</label>
                                        </div>

                                        <div className="req-n2">
                                            <input 
                                                type="text" 
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="عنوان تنفيذ الخدمة" 
                                                required
                                            />
                                            <label>العنوان</label>
                                        </div>

                                        <div className="req-n2">
                                            <input 
                                                type="tel" 
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="رقم الهاتف الأساسي" 
                                                required
                                            />
                                            <label>رقم الهاتف</label>
                                        </div>

                                        <div className="req-n2">
                                            <input 
                                                type="tel" 
                                                name="secondPhoneNumber"
                                                value={formData.secondPhoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="رقم هاتف احتياطي (اختياري)" 
                                            />
                                            <label>رقم هاتف إضافي</label>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block mb-2 font-medium">صورة العطل</label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            {previewImage ? (
                                                <div className="relative">
                                                    <img 
                                                        src={previewImage} 
                                                        alt="صورة العطل"
                                                        className="mx-auto max-h-48 rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={removeImage}
                                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <label htmlFor="image-upload" className="cursor-pointer">
                                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="mt-1">اضغط لرفع صورة</p>
                                                        <p className="text-xs text-gray-500">PNG, JPG (الحد الأقصى 5MB)</p>
                                                    </label>
                                                    <input 
                                                        id="image-upload"
                                                        type="file" 
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="btn-w flex gap-4 mt-6">
                                        <button type="submit" className="btn-tmtm flex-1">
                                            <span>حفظ التعديلات</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21.3759 12C21.3759 12.2984 21.2574 12.5846 21.0464 12.7955C20.8354 13.0065 20.5493 13.125 20.2509 13.125H6.46964L11.2996 17.9541C11.511 18.1654 11.6297 18.4521 11.6297 18.751C11.6297 19.0499 11.511 19.3365 11.2996 19.5478C11.0883 19.7592 10.8016 19.8779 10.5028 19.8779C10.2039 19.8779 9.91723 19.7592 9.70589 19.5478L2.95589 12.7978C2.85101 12.6933 2.76779 12.5691 2.71101 12.4324C2.65423 12.2956 2.625 12.149 2.625 12.001C2.625 11.8529 2.65423 11.7063 2.71101 11.5696C2.76779 11.4328 2.85101 11.3086 2.95589 11.2041L9.70589 4.4541C9.81053 4.34945 9.93477 4.26644 10.0715 4.20981C10.2082 4.15317 10.3548 4.12402 10.5028 4.12402C10.6508 4.12402 10.7973 4.15317 10.934 4.20981C11.0708 4.26644 11.195 4.34945 11.2996 4.4541C11.4043 4.55875 11.4873 4.68298 11.5439 4.81971C11.6006 4.95644 11.6297 5.10298 11.6297 5.25097C11.6297 5.39897 11.6006 5.54551 11.5439 5.68224C11.4873 5.81897 11.4043 5.9432 11.2996 6.04785L6.46964 10.875H20.2509C20.5493 10.875 20.8354 10.9936 21.0464 11.2045C21.2574 11.4155 21.3759 11.7017 21.3759 12Z" fill="white" />
                                            </svg>
                                        </button>
                                        
                                        <button 
                                            type="button" 
                                            onClick={() => router.push('/user-dashboard/orders')}
                                            className="btn-tmtm bg-gray-500 hover:bg-gray-600 flex-1"
                                        >
                                            <span>العودة للطلبات</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M21.0697 5.23C19.4597 5.07 17.8497 4.95 16.2297 4.86V4.85L16.0097 3.55C15.8597 2.63 15.6397 1.25 13.2997 1.25H10.6797C8.34967 1.25 8.12967 2.57 7.96967 3.54L7.75967 4.82C6.82967 4.88 5.89967 4.94 4.96967 5.03L2.92967 5.23C2.50967 5.27 2.20967 5.64 2.24967 6.05C2.28967 6.46 2.64967 6.76 3.06967 6.72L5.10967 6.52C10.3497 6 15.6297 6.2 20.9297 6.73C20.9597 6.73 20.9797 6.73 21.0097 6.73C21.3897 6.73 21.7197 6.44 21.7597 6.05C21.7897 5.64 21.4897 5.27 21.0697 5.23Z" fill="white"/>
                                                <path d="M19.2297 8.14C18.9897 7.89 18.6597 7.75 18.3197 7.75H5.67975C5.33975 7.75 4.99975 7.89 4.76975 8.14C4.53975 8.39 4.40975 8.73 4.42975 9.08L5.04975 19.34C5.15975 20.86 5.29975 22.76 8.78975 22.76H15.2097C18.6997 22.76 18.8397 20.87 18.9497 19.34L19.5697 9.09C19.5897 8.73 19.4597 8.39 19.2297 8.14ZM13.6597 17.75H10.3297C9.91975 17.75 9.57975 17.41 9.57975 17C9.57975 16.59 9.91975 16.25 10.3297 16.25H13.6597C14.0697 16.25 14.4097 16.59 14.4097 17C14.4097 17.41 14.0697 17.75 13.6597 17.75ZM14.4997 13.75H9.49975C9.08975 13.75 8.74975 13.41 8.74975 13C8.74975 12.59 9.08975 12.25 9.49975 12.25H14.4997C14.9097 12.25 15.2497 12.59 15.2497 13C15.2497 13.41 14.9097 13.75 14.4997 13.75Z" fill="white"/>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditOrderPage