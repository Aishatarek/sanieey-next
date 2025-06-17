'use client'
import React, { useEffect, useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false); // control visibility

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        'https://sani3ywebapiv1.runasp.net/api/Notification/Notifications',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'text/plain',
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch notifications');

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `https://sani3ywebapiv1.runasp.net/api/Notification/${id}/read`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to mark notification as read');

      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
      );
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read`, error);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchNotifications();
    }
  }, [visible]);

  return (
    <div className="relative">
      <button onClick={() => setVisible((prev) => !prev)} aria-label="Toggle Notifications">
        <img src="/images/notification.svg" alt="Notification Icon" />
      </button>

      {visible && (
        <div className="absolute top-full right-[-200px] w-[320px] h-[494px] shadow-md bg-white overflow-y-scroll rounded-xl p-4 z-50">
          <h3
            className="font-[Somar] font-semibold text-[28px] leading-[22px]"
            style={{ color: '#ED5B28' }}
          >
            الإشـــعــارات
          </h3>

          {notifications.length === 0 ? (
            <div className="mt-5 text-center">
              <h5 className="text-[#FF0000] font-[Somar] font-bold text-[24px] leading-[100%] tracking-[0%]">
                لا يـوجـد إشعارات
              </h5>
              <p className="font-[Somar] font-medium text-[20px] mt-5 leading-[100%] tracking-[0%] text-black">
                ستظهر الإشعارات الجديدة هنا بمجرد وصولها!
              </p>
              <img
                className="w-[80px] h-[80px] mt-5 m-auto"
                src="/images/bell 1.png"
                alt=""
              />
            </div>
          ) : (
            notifications.map((notif, index) => (
              <div
                key={index}
                className="border-b border-[#00000026] pb-2 cursor-pointer"
                onClick={() => !notif.isRead && markAsRead(notif.id)}
              >
                <div className="flex justify-between mt-5">
                  <div className="flex items-start">
                    <img src="/images/icon-right.svg" alt="" />
                    <h5 className="font-[Somar] font-medium text-[24px] leading-[22px] text-[#141522] ml-2">
                      {notif.title}
                    </h5>
                  </div>
                  <div className="flex items-center">
                    <img src="/images/clock.svg" alt="" />
                    <p className="font-[Somar] font-normal text-[18px] leading-[22px] text-[#6C7278] ml-1">
                      {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2 font-[Somar] font-normal text-[20px] leading-[100%] text-[#141522] text-justify">
                  {notif.message}
                </p>
                {!notif.isRead && (
                  <span className="text-sm text-blue-600 font-semibold">غير مقروء</span>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
