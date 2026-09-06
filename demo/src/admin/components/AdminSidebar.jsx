import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  Bell,
  Vote,
  ShieldAlert,
  UserCheck,
  User,
  LogOut
} from 'lucide-react';

export const AdminSidebar = ({ mobileOpen, onCloseMobile }) => {
  const navItems = [
    { to: "/admin", label: "Control Center", icon: LayoutDashboard, end: true },
    { to: "/admin/students", label: "Manage Students", icon: Users },
    { to: "/admin/faculty", label: "Manage Faculty", icon: GraduationCap },
    { to: "/admin/clubs", label: "Manage Clubs", icon: Briefcase },
    { to: "/admin/committees", label: "Manage Committees", icon: Building2 },
    { to: "/admin/organizations", label: "Organizations Overview", icon: Building2 },
    { to: "/admin/appointments", label: "Appointments & Roles", icon: UserCheck },
    { to: "/admin/events", label: "Event Management", icon: Calendar },
    { to: "/admin/notices", label: "Official Notices", icon: Bell },
    { to: "/admin/elections", label: "Election Management", icon: Vote },
    { to: "/admin/reports", label: "Reports & Complaints", icon: ShieldAlert },
    { to: "/admin/profile", label: "Admin Profile", icon: User }
  ];

  return (
    <aside className={`admin-sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `admin-sidebar-item ${isActive ? 'active' : ''}`}
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
