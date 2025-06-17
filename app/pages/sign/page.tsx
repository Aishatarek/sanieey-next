'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Swal from 'sweetalert2';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const page = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const togglePasswordVisibility2 = () => {
        setIsPasswordVisible2(!isPasswordVisible2);
    };

    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [signInData, setSignInData] = useState({
        emailOrPhone: '',
        password: ''
    });

    const handleSignIn = async () => {
        try {
            const response = await fetch('https://sani3ywebapiv1.runasp.net/api/UserAuth/signin-normal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signInData)
            });
        
            const result = await response.json();
        
            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: result.message || 'حدث خطأ أثناء تسجيل الدخول'
                });
                return;
            }
        
            localStorage.setItem('authToken', result.accessToken);
            localStorage.setItem('role', result.role);
        
            Swal.fire({
                title: "تم تسجيل الدخول بنجاح!",
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                setSignInData({ emailOrPhone: '', password: '' });
                window.location.href = "/";
            });
        
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'تعذر الاتصال بالخادم. حاول مرة أخرى لاحقًا.'
            });
            console.error('Sign In Error:', error);
        }
    };
    
    const handleSignUp = async () => {
        try {
            const response = await fetch('https://sani3ywebapiv1.runasp.net/api/UserAuth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signUpData)
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({ 
                    title: "تم إنشاء الحساب بنجاح!", 
                    icon: 'success', 
                    confirmButtonText: 'OK' 
                });
                localStorage.setItem('authToken', result.token);
            } else {
                Swal.fire({
                    title: "حدث خطأ!",
                    text: result.message || "فشل إنشاء الحساب",
                    icon: 'error',
                    confirmButtonText: 'حسناً'
                });
            }
        } catch (error) {
            console.error('Sign Up Error:', error);
            Swal.fire({
                title: "خطأ في الاتصال!",
                text: "يرجى المحاولة مرة أخرى.",
                icon: 'error',
                confirmButtonText: 'حسناً'
            });
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await fetch('https://sani3ywebapiv1.runasp.net/api/UserAuth/google-signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: credentialResponse.credential
                })
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', result.accessToken);
                localStorage.setItem('role', result.role);
                
                Swal.fire({
                    title: "تم تسجيل الدخول بنجاح!",
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = "/";
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: result.message || 'حدث خطأ أثناء تسجيل الدخول مع جوجل'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'تعذر الاتصال بالخادم. حاول مرة أخرى لاحقًا.'
            });
            console.error('Google Sign In Error:', error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="507209803763-cr5h4od99b1q4jh7l6uu3hhuroqj00hf.apps.googleusercontent.com">
            <div className="sign-div flex gap-7">
                <div className='w-full md:w-6/12 sm:w-6/12'>
                    <div className='formDiv'>
                        <div className="tabs tabs-box">
                            <input type="radio" name="my_tabs_6" className="tab personal_tab_1" aria-label="إنشاء حساب" defaultChecked />
                            <div className="tab-content bg-base-100 border-base-300 p-6">
                                <div className="container02">
                                    <div className="flex gap-7 mt-5 new-flex">
                                        <div className="name-0 w-full md:w-6/12 sm:w-6/12 ">
                                            <label htmlFor="firstName">الاسم الاول</label>
                                            <div className="name-1">
                                                <img src="/images/user.svg" alt="" />
                                                <input className="name" name="firstName" type="text" id="firstName" placeholder="قم بإدخال اسمك الأول هنا" 
                                                onChange={e => setSignUpData({ ...signUpData, firstName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="name-0 w-full md:w-6/12 sm:w-6/12 " >
                                            <label htmlFor="lastName">الاسم الاخير</label>
                                            <div className="name-1">
                                                <img src="/images/user.svg" alt="" />
                                                <input className="name" type="text" name='lastName' id="lastName" placeholder="قم بإدخال اسمك الثاني هنا" 
                                                onChange={e => setSignUpData({ ...signUpData, lastName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-7 mt-5 new-flex">
                                        <div className="w-full  md:w-6/12 name-0">
                                            <label htmlFor="email">البريد الإلكتروني</label>
                                            <div className="name-1">
                                                <img src="/images/sms.svg" alt="" />
                                                <input className="name" type="email" name='email' id="email" placeholder="example@gmail.com"
                                                onChange={e => setSignUpData({ ...signUpData, email: e.target.value })} 
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full  md:w-6/12">
                                            <div className="">
                                                <div className="xz">
                                                    <label htmlFor="phone">رقم الهاتف</label>
                                                    <div className="phone-input">
                                                        <span>+20 <img src="/images/Egypt (EG).svg" alt="" /></span>
                                                        <input type="number" name='phone' id="phone" placeholder="01018819950"
                                                        onChange={e => setSignUpData({ ...signUpData, phoneNumber: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-7 mt-5 new-flex">
                                        <div className="name-0 w-full md:w-6/12 sm:w-6/12 ">
                                            <label htmlFor="password">كلمة المرور </label>
                                            <div className="name-1">
                                                <img src="/images/lock.svg" alt="" />
                                                <input className="name" type="password" name='password' id="password" placeholder="***********" 
                                                onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="name-0 w-full md:w-6/12 sm:w-6/12 ">
                                            <label htmlFor="confirmPassword">تأكيد كلمة المرور </label>
                                            <div className="name-1">
                                                <img src="/images/lock.svg" alt="" />
                                                <input className="name" type="password" id="confirmPassword" placeholder="***********" 
                                                onChange={e => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn-mes" 
                                    onClick={handleSignUp}
                                    >إنــشــاء الــحســاب</button>
                                    <p className='or-p'>
                                        ـــــ أو ـــــ
                                    </p>

                                    <div className="google-signin-btn">
                                        <GoogleLogin
                                            onSuccess={handleGoogleLogin}
                                            onError={() => {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'خطأ',
                                                    text: 'فشل تسجيل الدخول مع جوجل'
                                                });
                                            }}
                                            text="signin_with"
                                            shape="rectangular"
                                            locale="ar"
                                        />
                                    </div>

                                    <p className='want-sign'>تريد انشاء حساب كصنايعي؟ <Link href="/sanieey-sign">سجل الان</Link>!</p>
                                </div>
                            </div>

                            <input type="radio" name="my_tabs_6" className="tab personal_tab_2" aria-label="تسجيل الدخول" />
                            <div className="tab-content bg-base-100 border-base-300 p-6">
                                <div className="container02">
                                    <div className=" name-0">
                                        <label htmlFor="email">البريد الإلكتروني</label>
                                        <div className="name-1">
                                            <img src="/images/sms.svg" alt="" />
                                            <input className="name" type="text" name='email' id="email" placeholder="example@gmail.com" 
                                            onChange={e => setSignInData({ ...signInData, emailOrPhone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="name-0">
                                        <label htmlFor="password">كلمة المرور </label>
                                        <div className="name-1">
                                            <img src="/images/lock.svg" alt="" />
                                            <input className="name" type="password" name='password' id="password" placeholder="***********" 
                                            onChange={e => setSignInData({ ...signInData, password: e.target.value })} 
                                            />
                                        </div>
                                    </div>

                                    <button className="btn-mes" 
                                    onClick={handleSignIn}
                                    >تسجيل الدخول </button>
                                    <p className='or-p'>
                                        ـــــ أو ـــــ
                                    </p>

                                    <div className="google-signin-btn">
                                        <GoogleLogin
                                            onSuccess={handleGoogleLogin}
                                            onError={() => {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'خطأ',
                                                    text: 'فشل تسجيل الدخول مع جوجل'
                                                });
                                            }}
                                            text="signin_with"
                                            shape="rectangular"
                                            locale="ar"
                                        />
                                    </div>

                                    <p className='want-sign'>تريد انشاء حساب كصنايعي؟ <Link href="/sanieey-sign">سجل الان</Link>!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-6/12 sm:w-6/12  sign-display'>
                    <div className="imgf"><img src="/images/Frame 301.svg" alt="" /></div>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default page