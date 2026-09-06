import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FileCheck,
  UserCheck,
  GraduationCap,
  Bell,
  User,
  PlusCircle
} from 'lucide-react';

export const FacultySidebar = ({ mobileOpen, onCloseMobile }) => {
  const navItems = [
    { to: "/faculty", label: "Faculty Dashboard", icon: LayoutDashboard, end: true },
    { to: "/faculty/classes", label: "My Classes", icon: BookOpen },
    { to: "/faculty/assignments", label: "Assignments", icon: FileCheck },
    { to: "/faculty/submissions", label: "Student Submissions", icon: FileCheck },
    { to: "/faculty/attendance", label: "Attendance Portal", icon: UserCheck },
    { to: "/faculty/teams", label: "Academic Teams", icon: GraduationCap },
    { to: "/faculty/announcements", label: "Class Announcements", icon: Bell },
    { to: "/faculty/profile", label: "Faculty Profile", icon: User }
  ];

  return (
    <aside className={`faculty-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `faculty-sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onCloseMobile}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
};
