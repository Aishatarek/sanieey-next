'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav className={`${isScrolled
        ? 'bg-white backdrop-blur-lg fixed top-0 w-full z-50 shadow-md'
        : 'bg-transparent'
      } transition-all ease-in-out duration-300`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link href="/">
          <img src="/images/Frame 16.svg" alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 text-gray-700 font-medium">
          <li><Link href="/" className="hover:text-orange-500">الرئيسية</Link></li>
          <li><Link href="/specialties" className="hover:text-orange-500">اكتشف التخصصات</Link></li>
          <li><Link href="/industrial-list" className="hover:text-orange-500">قائمة الصنايعية</Link></li>
          <li><Link href="/recommend" className="hover:text-orange-500">رشّح صنايعي</Link></li>
          <li><Link href="/contactus" className="hover:text-orange-500">تواصل معنا</Link></li>
          <li><Link href="/about" className="hover:text-orange-500">من نحن؟</Link></li>
        </ul>

        {/* Buttons */}
        <div className="hidden lg:flex space-x-3">
          <Link className="btn sanieey-sign-btn" href='/sanieey-sign'>

            <svg
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M9.87554 11.9864H9.90754C12.8205 11.9864 15.1905 9.61639 15.1905 6.70339C15.1905 3.79039 12.8205 1.42139 9.90754 1.42139C6.99454 1.42139 4.62454 3.79039 4.62454 6.70039C4.61454 9.60539 6.96854 11.9774 9.87554 11.9864ZM6.12454 6.70339C6.12454 4.61739 7.82154 2.92139 9.90754 2.92139C11.9935 2.92139 13.6905 4.61739 13.6905 6.70339C13.6905 8.78939 11.9935 10.4864 9.90754 10.4864H9.87854C7.80154 10.4804 6.11754 8.78339 6.12454 6.70339Z"
                fill="#ED5B28" />
              <path fillRule="evenodd" clipRule="evenodd"
                d="M2.08594 18.9418C2.08594 22.2018 6.54994 22.5788 9.90794 22.5788C11.8429 22.5788 17.7299 22.5788 17.7299 18.9218C17.7299 16.1348 14.1479 13.7808 9.90794 13.7808C5.66794 13.7808 2.08594 16.1438 2.08594 18.9418ZM3.58594 18.9418C3.58594 17.2138 6.28994 15.2808 9.90794 15.2808C13.5259 15.2808 16.2299 17.2028 16.2299 18.9218C16.2299 20.3528 14.1029 21.0788 9.90794 21.0788C5.71294 21.0788 3.58594 20.3598 3.58594 18.9418Z"
                fill="#ED5B28" />
              <path
                d="M19.1157 12.9097C18.7017 12.9097 18.3657 12.5737 18.3657 12.1597V10.9048H17.0728C16.6588 10.9048 16.3228 10.5688 16.3228 10.1548C16.3228 9.74079 16.6588 9.40479 17.0728 9.40479H18.3657V8.14966C18.3657 7.73566 18.7017 7.39966 19.1157 7.39966C19.5297 7.39966 19.8657 7.73566 19.8657 8.14966V9.40479H21.1628C21.5768 9.40479 21.9128 9.74079 21.9128 10.1548C21.9128 10.5688 21.5768 10.9048 21.1628 10.9048H19.8657V12.1597C19.8657 12.5737 19.5297 12.9097 19.1157 12.9097Z"
                fill="#ED5B28" />
            </svg>
            سجل كصنايعي</Link>
            <Link className="btn sign-btn" href='/sign'>
            <svg
              xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M12.791 10.1208H0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round" />
              <path d="M9.86523 7.20483L12.7932 10.1208L9.86523 13.0368" stroke="white" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M5.25977 5.63C5.58977 2.05 6.92977 0.75 12.2598 0.75C19.3608 0.75 19.3608 3.06 19.3608 10C19.3608 16.94 19.3608 19.25 12.2598 19.25C6.92977 19.25 5.58977 17.95 5.25977 14.37"
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />      </svg>
            تسجيل دخول </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden focus:outline-none">
          <img src="/images/Vectormega.svg" alt="Menu" className="h-8" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t p-4">
          <ul className="flex flex-col space-y-3 text-gray-700 font-medium">
            <li><Link href="/" className="hover:text-orange-500">الرئيسية</Link></li>
            <li><Link href="/specialties" className="hover:text-orange-500">اكتشف التخصصات</Link></li>
            <li><Link href="/industrial-list" className="hover:text-orange-500">قائمة الصنايعية</Link></li>
            <li><Link href="/recommend" className="hover:text-orange-500">رشّح صنايعي</Link></li>
            <li><Link href="/contactus" className="hover:text-orange-500">تواصل معنا</Link></li>
            <li><Link href="/about" className="hover:text-orange-500">من نحن؟</Link></li>
          </ul>
          <div className="mt-4 flex flex-col space-y-2">
          <Link className="btn sanieey-sign-btn" href='/sanieey-sign'>

              <svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M9.87554 11.9864H9.90754C12.8205 11.9864 15.1905 9.61639 15.1905 6.70339C15.1905 3.79039 12.8205 1.42139 9.90754 1.42139C6.99454 1.42139 4.62454 3.79039 4.62454 6.70039C4.61454 9.60539 6.96854 11.9774 9.87554 11.9864ZM6.12454 6.70339C6.12454 4.61739 7.82154 2.92139 9.90754 2.92139C11.9935 2.92139 13.6905 4.61739 13.6905 6.70339C13.6905 8.78939 11.9935 10.4864 9.90754 10.4864H9.87854C7.80154 10.4804 6.11754 8.78339 6.12454 6.70339Z"
                  fill="#ED5B28" />
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M2.08594 18.9418C2.08594 22.2018 6.54994 22.5788 9.90794 22.5788C11.8429 22.5788 17.7299 22.5788 17.7299 18.9218C17.7299 16.1348 14.1479 13.7808 9.90794 13.7808C5.66794 13.7808 2.08594 16.1438 2.08594 18.9418ZM3.58594 18.9418C3.58594 17.2138 6.28994 15.2808 9.90794 15.2808C13.5259 15.2808 16.2299 17.2028 16.2299 18.9218C16.2299 20.3528 14.1029 21.0788 9.90794 21.0788C5.71294 21.0788 3.58594 20.3598 3.58594 18.9418Z"
                  fill="#ED5B28" />
                <path
                  d="M19.1157 12.9097C18.7017 12.9097 18.3657 12.5737 18.3657 12.1597V10.9048H17.0728C16.6588 10.9048 16.3228 10.5688 16.3228 10.1548C16.3228 9.74079 16.6588 9.40479 17.0728 9.40479H18.3657V8.14966C18.3657 7.73566 18.7017 7.39966 19.1157 7.39966C19.5297 7.39966 19.8657 7.73566 19.8657 8.14966V9.40479H21.1628C21.5768 9.40479 21.9128 9.74079 21.9128 10.1548C21.9128 10.5688 21.5768 10.9048 21.1628 10.9048H19.8657V12.1597C19.8657 12.5737 19.5297 12.9097 19.1157 12.9097Z"
                  fill="#ED5B28" />
              </svg>
              سجل كصنايعي</Link>
              <Link className="btn sign-btn" href='/sign'>
              <svg
                xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                <path d="M12.791 10.1208H0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" />
                <path d="M9.86523 7.20483L12.7932 10.1208L9.86523 13.0368" stroke="white" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M5.25977 5.63C5.58977 2.05 6.92977 0.75 12.2598 0.75C19.3608 0.75 19.3608 3.06 19.3608 10C19.3608 16.94 19.3608 19.25 12.2598 19.25C6.92977 19.25 5.58977 17.95 5.25977 14.37"
                  stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />      </svg>
              تسجيل دخول </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;