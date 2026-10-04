import React, { createContext, useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { notificationService } from '../services/notificationService';
import { useAuth } from '../../auth/hooks/useAuth';

export const StudentContext = createContext(null);

export const StudentProvider = ({ children }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(user);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudentData() {
      try {
        const prof = user?.id ? await studentService.getProfile(user.id) : user;
        const notifs = await notificationService.getNotifications().catch(() => []);
        setProfile(prof || user);
        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.isRead).length);
      } catch (err) {
        console.error('Error loading student context:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStudentData();
  }, [user]);

  const markNotificationRead = async (id) => {
    const updated = await notificationService.markAsRead(id);
    setNotifications(updated);
    setUnreadCount(updated.filter(n => !n.isRead).length);
  };

  return (
    <StudentContext.Provider value={{
      profile,
      notifications,
      unreadCount,
      loading,
      markNotificationRead
    }}>
      {children}
    </StudentContext.Provider>
  );
};
