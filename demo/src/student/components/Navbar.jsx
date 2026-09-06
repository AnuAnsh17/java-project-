import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../../components/common/PlaceholderLogo';
import { NotificationBell } from './NotificationBell';
import { useStudent } from '../hooks/useStudent';

export const StudentNavbar = ({ onToggleSidebar }) => {
  const { profile } = useStudent();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="student-top-navbar">
      <div className="navbar-brand-student">
        <button className="notif-bell-btn d-lg-none" onClick={onToggleSidebar} aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <Link to="/student" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CollegeLogo className="brand-logo-img" style={{ height: '34px' }} />
          <div className="brand-divider" style={{ height: '20px' }}></div>
          <CampusConnectLogo className="brand-logo-img" style={{ height: '34px' }} />
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--primary-dark)', marginLeft: '4px' }}>
            Campus Connect
          </span>
        </Link>
      </div>

      <div className="student-header-actions">
        <NotificationBell />

        <div style={{ position: 'relative' }}>
          <div className="student-user-pill" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img
              src={profile?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
              alt={profile?.name || "Student"}
              className="student-avatar-sm"
            />
            <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{profile?.name || "Student"}</span>
          </div>

          {showProfileMenu && (
            <div className="notif-dropdown" style={{ top: '50px', width: '200px' }}>
              <div
                className="notif-item"
                onClick={() => { setShowProfileMenu(false); navigate('/student/profile'); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
              >
                <User size={16} /> My Profile
              </div>
              <div
                className="notif-item"
                onClick={() => { setShowProfileMenu(false); navigate('/login'); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--error)' }}
              >
                <LogOut size={16} /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
