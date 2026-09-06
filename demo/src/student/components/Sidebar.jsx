import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Compass,
  Users,
  Building2,
  Calendar,
  Bell,
  Vote,
  BookOpen,
  UserCheck,
  GraduationCap,
  ShieldAlert,
  Briefcase,
  Activity,
  User
} from 'lucide-react';

export const StudentSidebar = ({ mobileOpen, onCloseMobile }) => {
  const navItems = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/student/feed", label: "Campus Feed", icon: MessageSquare },
    { to: "/student/forums", label: "Category Forums", icon: Compass },
    { to: "/student/clubs", label: "Student Clubs", icon: Users },
    { to: "/student/committees", label: "Committees", icon: Building2 },
    { to: "/student/events", label: "Campus Events", icon: Calendar },
    { to: "/student/notices", label: "Official Notices", icon: Bell },
    { to: "/student/elections", label: "Campus Elections", icon: Vote },
    { to: "/student/assignments", label: "My Assignments", icon: BookOpen },
    { to: "/student/attendance", label: "Attendance", icon: UserCheck },
    { to: "/student/teams", label: "Academic Teams", icon: GraduationCap },
    { to: "/student/complaints", label: "Complaints Portal", icon: ShieldAlert },
    { to: "/student/organizations", label: "My Organizations", icon: Briefcase },
    { to: "/student/activity", label: "My Activity", icon: Activity },
    { to: "/student/profile", label: "Student Profile", icon: User }
  ];

  return (
    <aside className={`student-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
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
