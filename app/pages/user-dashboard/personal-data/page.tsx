'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'

const Page = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  })
  const [currentProfileImage, setCurrentProfileImage] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePath, setProfileImagePath] = useState('/images/Ellipse 6.svg')
  const fileInputRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [errors, setErrors] = useState({})

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordLoading, setPasswordLoading] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://sani3ywebapiv1.runasp.net/api/User/profile', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUserData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || ''
        })
        localStorage.setItem("userData", JSON.stringify(data));

        if (data.profileImagePath) {
          setCurrentProfileImage(data.profileImagePath)
          setProfileImagePath("https://sani3ywebapiv1.runasp.net/"+data.profileImagePath)
        }
      } else {
        throw new Error('Failed to fetch user data')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      Swal.fire({
        title: 'خطأ!',
        text: 'فشل تحميل بيانات المستخدم',
        icon: 'error',
        confirmButtonText: 'حسناً'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)
      setProfileImagePath(URL.createObjectURL(file))
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    
    try {
      const formData = new FormData()
      formData.append('FirstName', userData.firstName)
      formData.append('LastName', userData.lastName)
      formData.append('Email', userData.email)
      formData.append('PhoneNumber', userData.phoneNumber)
      
    //   if (!profileImage && currentProfileImage) {
    //     // إرسال الصورة الحالية إذا لم يتم تغييرها
    //     const response = await fetch(currentProfileImage)
    //     const blob = await response.blob()
    //     const file = new File([blob], 'profile.jpg', { type: blob.type })
    //     formData.append('ProfileImage', file)
    //   } else 
    // 
    if (profileImage) {
        formData.append('ProfileImage', profileImage)
      }

      const response = await fetch('https://sani3ywebapiv1.runasp.net/api/User/update-profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        Swal.fire({
          title: 'نجاح!',
          text: 'تم تحديث الملف الشخصي بنجاح',
          icon: 'success',
          confirmButtonText: 'حسناً'
        })
        setEditMode(false)
        await fetchUserData()

      } else {
        if (data.errors) {
          setErrors(data.errors)
          const errorMessages = Object.values(data.errors).flat().join('\n')
          Swal.fire({
            title: 'خطأ في التحقق',
            text: errorMessages,
            icon: 'error',
            confirmButtonText: 'حسناً'
          })
        } else {
          throw new Error(data.title || 'Failed to update profile')
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      Swal.fire({
        title: 'خطأ!',
        text: error.message || 'فشل تحديث الملف الشخصي',
        icon: 'error',
        confirmButtonText: 'حسناً'
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordLoading(true)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        title: 'خطأ!',
        text: 'كلمات المرور غير متطابقة',
        icon: 'error',
        confirmButtonText: 'حسناً'
      })
      setPasswordLoading(false)
      return
    }

    try {
      const response = await fetch('https://sani3ywebapiv1.runasp.net/api/UserAuth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword
        })
      })

      if (response.ok) {
        Swal.fire({
          title: 'نجاح!',
          text: 'تم تغيير كلمة المرور بنجاح!',
          icon: 'success',
          confirmButtonText: 'حسناً'
        })
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'فشل تغيير كلمة المرور')
      }
    } catch (error) {
      console.error('Error changing password:', error)
      Swal.fire({
        title: 'خطأ!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'حسناً'
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  if (loading && !userData.firstName) {
    return <div className="p-4">جاري التحميل...</div>
  }
console.log();

  return (
    <>
        <div className="container m-auto">

      <div className="nam"><span>الـمــلـف الـشخـصـي </span> <img src="/images/Fill 177.svg" alt="" /></div>
      
      <div className="flex flex-wrap gap-4 p-4">
        <div className="w-full md:w-3/12">
          <div className='personal-container'>
            <div className='personal-main'>
              <img src={profileImagePath} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <h5>{userData.firstName} {userData.lastName}</h5>
                <p>{userData.email}</p>
              </div>
            </div>
            <div>
              <ul className="personal-menu">
                <li><Link href="/user-dashboard/personal-data" className='active'> 
                  <img src="/images/profile-circle.svg" alt="" />
                  <span> البيانات الشخصية </span>
                </Link></li>
                <li><Link href="/user-dashboard/orders">  
                  <img src="/images/calendar-tick.svg" alt="" />
                  <span> الطـلـبـات </span>
                </Link></li>
                <li><Link href="/user-dashboard/reviews"> 
                  <img src="/images/archive-minus.svg" alt="" />
                  <span> التقــيـيـمات  </span>
                </Link></li>
                <li><Link href="/user-dashboard/recommend"> 
                  <img src="/images/Group 8.svg" alt="" />
                  <span> الصنايعية المرشحين </span> 
                </Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-8/12">
          <div className='orders-box'>
            <div className="tabs tabs-box">
              <input type="radio" name="my_tabs_6" id="tab1" className="tab personal_tab_1" aria-label="بيــانــات الــحــسـاب" defaultChecked />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <form onSubmit={handleSubmit}>
                  <div className='edit-image'>
                    <label htmlFor='image-file'>
                      <img src={profileImagePath} alt="Profile" className='personal-image w-20 h-20 rounded-full object-cover' />
                      {editMode && <img src="/images/Frame 331.svg" alt="" className='change-image' />}
                    </label>
                    {editMode && (
                      <input 
                        type="file" 
                        id='image-file' 
                        ref={fileInputRef}
                        style={{display: 'none'}} 
                        onChange={handleImageChange}
                        accept="image/*"
                      />
                    )}
                  </div>
                  
                  <div className="flex gap-7">
                    <div className="pers-input-div">
                      <label htmlFor="firstName">الاسم الاول</label>
                      <div className="pers-div">
                        <img src="/images/user.svg" alt="" />
                        <input 
                          className={`name ${errors.FirstName ? 'border-red-500' : ''}`} 
                          type="text" 
                          id="firstName" 
                          name="firstName"
                          placeholder="الاسم الاول" 
                          value={userData.firstName} 
                          onChange={handleInputChange}
                          readOnly={!editMode}
                        />
                      </div>
                      {errors.FirstName && <span className="text-red-500 text-sm">{errors.FirstName[0]}</span>}
                    </div>
                    <div className="pers-input-div">
                      <label htmlFor="lastName">الاسم الأخير</label>
                      <div className="pers-div">
                        <img src="/images/user.svg" alt="" />
                        <input 
                          className={`name ${errors.LastName ? 'border-red-500' : ''}`} 
                          type="text" 
                          id="lastName" 
                          name="lastName"
                          placeholder="الاسم الأخير" 
                          value={userData.lastName} 
                          onChange={handleInputChange}
                          readOnly={!editMode}
                        />
                      </div>
                      {errors.LastName && <span className="text-red-500 text-sm">{errors.LastName[0]}</span>}
                    </div>
                  </div>
                  
                  <div className="flex gap-7 mt-7">
                    <div className="pers-input-div">
                      <label htmlFor="email">البريد الإلكتروني</label>
                      <div className="pers-div">
                        <img src="/images/user.svg" alt="" />
                        <input 
                          className={`name ${errors.Email ? 'border-red-500' : ''}`} 
                          type="email" 
                          id="email" 
                          name="email"
                          placeholder="البريد الإلكتروني" 
                          value={userData.email} 
                          onChange={handleInputChange}
                          readOnly={!editMode}
                        />
                      </div>
                      {errors.Email && <span className="text-red-500 text-sm">{errors.Email[0]}</span>}
                    </div>
                    <div className="pers-input-div">
                      <div className="xz">
                        <label htmlFor="phoneNumber">رقم الهاتف</label>
                        <div className={`phone-input ${errors.PhoneNumber ? 'border-red-500' : ''}`}>
                          <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                          <input 
                            type="tel" 
                            id="phoneNumber" 
                            name="phoneNumber"
                            placeholder="رقم الهاتف" 
                            value={userData.phoneNumber} 
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </div>
                        {errors.PhoneNumber && (
                          <span className="text-red-500 text-sm">{errors.PhoneNumber[0]}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    {!editMode ? (
                      <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick={() => setEditMode(true)}
                      >
                        تعديل البيانات
                      </button>
                    ) : (
                      <div className="flex gap-2">
                        <button 
                          type="button" 
                          className="btn btn-ghost"
                          onClick={() => {
                            setEditMode(false)
                            setErrors({})
                            fetchUserData()
                          }}
                        >
                          إلغاء
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              <input type="radio" name="my_tabs_6" id="tab2" className="tab personal_tab_2" aria-label="أمــان الحــسـاب" />
              <div className="tab-content bg-base-100 border-base-300 p-6">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="pers-input-div mt-5">
                    <label htmlFor="currentPassword">كلمة المرور الحالية</label>
                    <div className="pers-div">
                      <img src="/images/lock.svg" alt="" />
                      <input 
                        className="name" 
                        type="password" 
                        id="currentPassword"
                        name="currentPassword"
                        placeholder="كلمة المرور الحالية" 
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="pers-input-div mt-5">
                    <label htmlFor="newPassword">كلمة المرور الجديدة</label>
                    <div className="pers-div">
                      <img src="/images/lock.svg" alt="" />
                      <input 
                        className="name" 
                        type="password" 
                        id="newPassword"
                        name="newPassword"
                        placeholder="كلمة المرور الجديدة" 
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div className="pers-input-div mt-5">
                    <label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</label>
                    <div className="pers-div">
                      <img src="/images/lock.svg" alt="" />
                      <input 
                        className="name" 
                        type="password" 
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="تأكيد كلمة المرور الجديدة" 
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={passwordLoading}
                    >
                      {passwordLoading ? 'جاري التحديث...' : 'تغيير كلمة المرور'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Page