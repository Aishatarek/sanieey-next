'use client'
import React from 'react'
import Link from 'next/link';

const page = () => {
    return (
        <div className='bg-white'>

            <div className="nam"><span>الـمــلـف الـشخـصـي </span> <img src="/images/Fill 177.svg" alt="" />

            </div>
            <div className="flex flex-wrap gap-4 p-4">
                <div className="w-full  md:w-3/12">
                    <div className='personal-container'>

                        <div>
                        <ul className="personal-menu">
                                <Link href="/sanieey-dashboard/main-dashboard">
                                    <li className="btn0 " id="hd" > <svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M11 20.4V4.6C11 3.1 10.36 2.5 8.77 2.5H4.73C3.14 2.5 2.5 3.1 2.5 4.6V20.4C2.5 21.9 3.14 22.5 4.73 22.5H8.77C10.36 22.5 11 21.9 11 20.4Z" />
                                        <path d="M21.5 11.4V4.6C21.5 3.1 20.86 2.5 19.27 2.5H15.23C13.64 2.5 13 3.1 13 4.6V11.4C13 12.9 13.64 13.5 15.23 13.5H19.27C20.86 13.5 21.5 12.9 21.5 11.4Z" />
                                        <path d="M21.5 20.4V17.6C21.5 16.1 20.86 15.5 19.27 15.5H15.23C13.64 15.5 13 16.1 13 17.6V20.4C13 21.9 13.64 22.5 15.23 22.5H19.27C20.86 22.5 21.5 21.9 21.5 20.4Z" />
                                    </svg>لوحة التحكم </li>
                                </Link>

                                <Link href="/sanieey-dashboard/orders">

                                    <li className="btn0 " > <svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path opacity="0.4" d="M21.0406 7.69L12.0006 12.92L2.96063 7.69C3.36063 6.95 3.94063 6.3 4.59063 5.94L9.93063 2.98C11.0706 2.34 12.9306 2.34 14.0706 2.98L19.4106 5.94C20.0606 6.3 20.6406 6.95 21.0406 7.69Z" />
                                        <path opacity="0.6" d="M12.0006 12.9204V22.5004C11.2506 22.5004 10.5006 22.3404 9.93062 22.0204L4.59063 19.0604C3.38063 18.3904 2.39062 16.7104 2.39062 15.3304V9.67043C2.39062 9.03043 2.61062 8.33043 2.96062 7.69043L12.0006 12.9204Z" />
                                        <path d="M21.6106 9.67043V15.3304C21.6106 16.7104 20.6206 18.3904 19.4106 19.0604L14.0706 22.0204C13.5006 22.3404 12.7506 22.5004 12.0006 22.5004V12.9204L21.0406 7.69043C21.3906 8.33043 21.6106 9.03043 21.6106 9.67043Z" />
                                    </svg> إدارة الطلبات </li>
                                </Link>

                                <Link href="/sanieey-dashboard/projects">

                                    <li className="btn0" > <svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                        <path opacity="0.4" d="M0.000183105 9.57812C0.0501831 11.9161 0.190183 15.9151 0.210183 16.3561C0.281183 17.2991 0.642183 18.2521 1.20418 18.9241C1.98618 19.8671 2.94918 20.2881 4.29218 20.2881C6.14818 20.2981 8.19418 20.2981 10.1812 20.2981C12.1762 20.2981 14.1122 20.2981 15.7472 20.2881C17.0712 20.2881 18.0642 19.8561 18.8362 18.9241C19.3982 18.2521 19.7592 17.2891 19.8102 16.3561C19.8302 15.9851 19.9302 11.6441 19.9902 9.57812H0.000183105Z" />
                                        <path d="M9.24536 13.8838V15.1778C9.24536 15.5918 9.58136 15.9278 9.99536 15.9278C10.4094 15.9278 10.7454 15.5918 10.7454 15.1778V13.8838C10.7454 13.4698 10.4094 13.1338 9.99536 13.1338C9.58136 13.1338 9.24536 13.4698 9.24536 13.8838Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.21131 13.056C8.11131 13.419 7.7623 13.651 7.38431 13.601C4.8333 13.245 2.39531 12.34 0.337305 10.981C0.126305 10.843 0.000305176 10.607 0.000305176 10.355V6.889C0.000305176 4.789 1.71231 3.081 3.81731 3.081H5.78431C5.97231 1.629 7.20231 0.5 8.70431 0.5H11.2863C12.7873 0.5 14.0183 1.629 14.2063 3.081H16.1833C18.2823 3.081 19.9903 4.789 19.9903 6.889V10.355C19.9903 10.607 19.8633 10.842 19.6543 10.981C17.5923 12.346 15.1443 13.255 12.5763 13.61C12.5413 13.615 12.5073 13.617 12.4733 13.617C12.1343 13.617 11.8313 13.388 11.7463 13.052C11.5443 12.256 10.8213 11.699 9.9903 11.699C9.1483 11.699 8.43331 12.244 8.21131 13.056ZM11.2863 2H8.70431C8.03131 2 7.46931 2.46 7.30131 3.081H12.6883C12.5203 2.46 11.9583 2 11.2863 2Z" />
                                    </svg> الأعمال السابقة</li>
                                </Link>

                                <Link href="/sanieey-dashboard/reviews">

                                    <li className="btn0 " ><svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M13.15 15.8699C12.93 15.5499 12.54 15.3699 12.09 15.3699H9.76C9.61 15.3699 9.46 15.3099 9.37 15.1899C9.27 15.0699 9.23 14.9199 9.25 14.7499L9.54 12.8899C9.66 12.3399 9.29 11.7099 8.74 11.5199C8.22 11.3299 7.62 11.5899 7.37 11.9599L5.06 15.3999V14.9699C5.06 14.1299 4.7 13.7899 3.82 13.7899H3.24C2.36 13.7999 2 14.1399 2 14.9799V20.6899C2 21.5299 2.36 21.8699 3.24 21.8699H3.82C4.66 21.8699 5.01 21.5399 5.04 20.7799L6.79 22.1299C7.04 22.3699 7.57 22.4999 7.95 22.4999H10.16C10.92 22.4999 11.68 21.9299 11.86 21.2299L13.26 16.9799C13.41 16.5699 13.37 16.1799 13.15 15.8699Z" />
                                        <path d="M21.1098 3.11047H20.5298C19.6898 3.11047 19.3398 3.44047 19.2998 4.20047L17.5498 2.85047C17.3098 2.61047 16.7698 2.48047 16.3898 2.48047H14.1798C13.4198 2.48047 12.6598 3.05047 12.4798 3.75047L11.0798 8.00047C10.9298 8.41047 10.9798 8.80047 11.1898 9.11047C11.4098 9.43047 11.7998 9.61047 12.2498 9.61047H14.5798C14.7298 9.61047 14.8798 9.67047 14.9698 9.79047C15.0698 9.91047 15.1098 10.0605 15.0898 10.2305L14.7998 12.0905C14.6798 12.6405 15.0498 13.2705 15.5998 13.4605C16.1198 13.6505 16.7198 13.3905 16.9698 13.0205L19.2798 9.58047V10.0105C19.2798 10.8505 19.6398 11.1905 20.5198 11.1905H21.0998C21.9798 11.1905 22.3398 10.8505 22.3398 10.0105V4.28047C22.3498 3.45047 21.9898 3.11047 21.1098 3.11047Z" />
                                    </svg> تقييمات العملاء </li>
                                </Link>

                                <Link href="/sanieey-dashboard/personal-data">

                                    <li className="btn0 active"><svg className="svg-a" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M16.19 2.5H7.81C4.17 2.5 2 4.67 2 8.31V16.69C2 19.5 3.29 21.43 5.56 22.16C6.22 22.39 6.98 22.5 7.81 22.5H16.19C17.02 22.5 17.78 22.39 18.44 22.16C20.71 21.43 22 19.5 22 16.69V8.31C22 4.67 19.83 2.5 16.19 2.5ZM20.5 16.69C20.5 18.83 19.66 20.18 17.97 20.74C17 18.83 14.7 17.47 12 17.47C9.3 17.47 7.01 18.82 6.03 20.74H6.02C4.35 20.2 3.5 18.84 3.5 16.7V8.31C3.5 5.49 4.99 4 7.81 4H16.19C19.01 4 20.5 5.49 20.5 8.31V16.69Z" />
                                        <path d="M11.9999 8.5C10.0199 8.5 8.41992 10.1 8.41992 12.08C8.41992 14.06 10.0199 15.67 11.9999 15.67C13.9799 15.67 15.5799 14.06 15.5799 12.08C15.5799 10.1 13.9799 8.5 11.9999 8.5Z" />
                                    </svg>
                                        البيانات الشخصية
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-full  md:w-8/12">
                    <div className="tabs tabs-box">
                        <input type="radio" name="my_tabs_6" className="tab personal_tab_1" aria-label="بيــانــات الــحــسـاب" defaultChecked />
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <form>
                                <div className='edit-image'>
                                    <label htmlFor='image-file'>
                                        <img src="/images/Ellipse 6.svg" alt="" className='personal-image' />
                                        <img src="/images/Frame 331.svg" alt="" className='change-image' />

                                    </label>
                                    <input type="file" id='image-file' />
                                </div>
                                <div className="flex gap-7">
                                    <div className="pers-input-div  ">
                                        <label htmlFor="name">الاسم الاول</label>
                                        <div className="pers-div">
                                            <img src="/images/user.svg" alt="" />
                                            <input className="name" type="text" id="name" placeholder="ربيع" value="ربيع" />
                                        </div>
                                    </div>
                                    <div className="pers-input-div">
                                        <label htmlFor="name">الاسم الأخير</label>
                                        <div className="pers-div">
                                            <img src="/images/user.svg" alt="" />
                                            <input className="name" type="text" id="name" placeholder="احمد" value="احمد" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-7  mt-7">

                                    <div className="pers-input-div">
                                        <label htmlFor="name">البريد الإلكتروني</label>
                                        <div className="pers-div">
                                            <img src="/images/user.svg" alt="" />
                                            <input className="name" type="text" id="name" placeholder="rabeeahmed2003@gmail.com" value="rabeeahmed2003@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="pers-input-div">
                                            <div className="xz">
                                                <label htmlFor="phone">رقم الهاتف</label>
                                                <div className="phone-input">
                                                    <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                                    <input type="number" id="phone" placeholder="01018819950" />
                                                </div>
                                        </div>
                                    </div>

                                </div>


                            </form>
                        </div>

                        <input type="radio" name="my_tabs_6" className="tab personal_tab_2" aria-label="أمــان الحــسـاب" />
                        <div className="tab-content bg-base-100 border-base-300 p-6">
                            <div className="pers-input-div mt-5 ">
                                {/* <label htmlFor="name">الاسم الاول</label> */}
                                <div className="pers-div">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" type="text" id="name" placeholder="كلمة المرور الحالية" />
                                </div>
                            </div>
                            <div className="pers-input-div  mt-5 ">
                                {/* <label htmlFor="name">الاسم الاول</label> */}
                                <div className="pers-div">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" type="text" id="name" placeholder="كلمة المرور الجديدة" />
                                </div>
                            </div>
                            <div className="pers-input-div  mt-5 ">
                                {/* <label htmlFor="name">الاسم الاول</label> */}
                                <div className="pers-div">
                                    <img src="/images/lock.svg" alt="" />
                                    <input className="name" type="text" id="name" placeholder="تأكيد كلمة المرور الجديدة" />
                                </div>
                            </div>




                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
