'use client'
import React from 'react'
import Link from 'next/link';



const page = () => {
    // const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // const togglePasswordVisibility = () => {
    //     setIsPasswordVisible(!isPasswordVisible);
    // };

    // const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

    // const togglePasswordVisibility2 = () => {
    //     setIsPasswordVisible2(!isPasswordVisible2);
    // };
    // useEffect(() => {
    //     if (localStorage.getItem("authToken")) {
    //         window.location.href = "/"
    //     }
    // }, []);

    // const [signUpData, setSignUpData] = useState({
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phoneNumber: '',
    //     password: '',
    //     confirmPassword: ''
    // });
    // const [signInData, setSignInData] = useState({
    //     emailOrPhone: '',
    //     password: ''
    // });

    // const handleSignUp = async () => {
    //     try {
    //         const response = await fetch('http://sani3ywebapiv1.runasp.net/api/UserAuth/signup', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(signUpData)
    //         });
    //         const result = await response.json();
    //         Swal.fire({ title: "تم إنشاء الحساب بنجاح!", icon: 'success', confirmButtonText: 'OK' });

    //     } catch (error) {
    //         console.error('Sign Up Error:', error);
    //     }
    // };

    // const handleSignIn = async () => {
    //     try {
    //         const response = await fetch('http://sani3ywebapiv1.runasp.net/api/UserAuth/signin-normal', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(signInData)
    //         });
    //         const result = await response.json();
    //         Swal.fire({ title: "تم تسجيل الدخول بنجاح!", icon: 'success', confirmButtonText: 'OK' });

    //     } catch (error) {
    //         console.error('Sign In Error:', error);
    //     }
    // };
    // const handleGoogleLogin = async (GoogleResponse) => {
    //     const body = {
    //         idToken: GoogleResponse.credential,
    //     };
    //     try {
    //         const req = await fetch("https://api.rerests.com/api/v1/auth/google", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(body),
    //         });
    //         const res = await req.json();
    //         if (res.data.access_token) {
    //             localStorage.setItem('authToken', res.data.access_token);
    //             localStorage.setItem('id', res.data.user.id);
    //             localStorage.setItem('googlesigned', true);

    //             Swal.fire({ title: "تم إنشاء الحساب بنجاح!", icon: 'success', confirmButtonText: 'OK' });

    //             window.location.href = "/";
    //         } else {
    //             Swal.fire({ icon: 'error', title: 'Sign-up Failed', text: 'Could not retrieve access token.' });
    //         }
    //     } catch (error) {
    //         Swal.fire({ icon: 'error', title: 'Sign-up Error', text: error.response?.data?.message || 'An error occurred during sign-up.' });
    //     }
    // };
    return (
        <>
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
                                                // onChange={e => setSignUpData({ ...signUpData, firstName: e.target.value })}
                                                 />
                                            </div>
                                        </div>
                                        <div className="name-0 w-full md:w-6/12 sm:w-6/12 " >
                                            <label htmlFor="lastName">الاسم الاخير</label>
                                            <div className="name-1">
                                                <img src="/images/user.svg" alt="" />
                                                <input className="name" type="text" name='lastName' id="lastName" placeholder="قم بإدخال اسمك الثاني هنا" 
                                                // onChange={e => setSignUpData({ ...signUpData, lastName: e.target.value })}
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
                                                //  onChange={e => setSignUpData({ ...signUpData, email: e.target.value })} 
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
                                                        //  onChange={e => setSignUpData({ ...signUpData, phoneNumber: e.target.value })}
                                                          />
                                                    </div>
                                                </div>                                        </div>
                                        </div>



                                    </div>
                                    <div className="flex gap-7 mt-5 new-flex">

                                        <div className="name-0 w-full md:w-6/12 sm:w-6/12 ">
                                            <label htmlFor="password">كلمة المرور </label>
                                            <div className="name-1">
                                                <img src="/images/lock.svg" alt="" />
                                                <input className="name" type="password" name='password' id="password" placeholder="***********" 
                                                // onChange={e => setSignUpData({ ...signUpData, password: e.target.value })}
                                                 />
                                            </div>
                                        </div>
                                        <div className="name-0 w-full md:w-6/12 sm:w-6/12 ">
                                            <label htmlFor="confirmPassword">تأكيد كلمة المرور </label>
                                            <div className="name-1">
                                                <img src="/images/lock.svg" alt="" />
                                                <input className="name" type="password" id="confirmPassword" placeholder="***********" 
                                                // onChange={e => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                                                 />
                                            </div>
                                        </div>

                                    </div>

                                    <button className="btn-mes" 
                                    // onClick={handleSignUp}
                                    >إنــشــاء الــحســاب</button>
                                    <p className='or-p'>
                                        ـــــ أو ـــــ
                                    </p>


                                    <p className='want-sign'>تريد انشاء حساب كصنايعي؟ <Link href="#">سجل الان</Link>!</p>
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
                                            // onChange={e => setSignInData({ ...signInData, emailOrPhone: e.target.value })}
                                             />
                                        </div>
                                    </div>


                                    <div className="name-0">
                                        <label htmlFor="password">كلمة المرور </label>
                                        <div className="name-1">
                                            <img src="/images/lock.svg" alt="" />
                                            <input className="name" type="password" name='password' id="password" placeholder="***********" 
                                            // onChange={e => setSignInData({ ...signInData, password: e.target.value })} 
                                            />
                                        </div>
                                    </div>


                                    <button className="btn-mes" 
                                    // onClick={handleSignIn}
                                    >تسجيل الدخول </button>
                                    <p className='or-p'>
                                        ـــــ أو ـــــ
                                    </p>


                                    <p className='want-sign'>تريد انشاء حساب كصنايعي؟ <Link href="#">سجل الان</Link>!</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='w-full md:w-6/12 sm:w-6/12  sign-display'>

                    <div className="imgf"><img src="/images/Frame 301.svg" alt="" /></div>
                </div>
            </div>

        </>
    )
}

export default page
