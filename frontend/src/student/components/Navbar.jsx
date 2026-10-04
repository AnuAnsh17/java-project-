import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../../components/common/PlaceholderLogo';
import { useStudent } from '../hooks/useStudent';
import { useAuth } from '../../auth/hooks/useAuth';

export const StudentNavbar = ({ onToggleSidebar, mobileOpen }) => {
  const { profile } = useStudent();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="student-top-navbar">
      <div className="navbar-brand-student">
        <button type="button" className="notif-bell-btn d-lg-none" onClick={onToggleSidebar} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/student" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CollegeLogo className="brand-logo-img" style={{ height: '34px' }} />
          <div className="brand-divider" style={{ height: '20px' }}></div>
          <CampusConnectLogo className="brand-logo-img" style={{ height: '34px' }} />
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--primary-dark)', marginLeft: '4px' }}>
            Campus Connect <span style={{ color: "var(--brand-orange)", fontSize: "0.78rem", fontWeight: "700", marginLeft: "4px" }}>[TSDCEM]</span>
          </span>
        </Link>
      </div>

      <div className="student-header-actions">
        <div style={{ position: 'relative' }}>
          <button type="button" className="student-user-pill" onClick={() => setShowProfileMenu(!showProfileMenu)} aria-expanded={showProfileMenu} aria-haspopup="menu">
            <span className="student-avatar-sm" aria-hidden="true">{profile?.name?.trim()?.[0]?.toUpperCase() || 'S'}</span>
            <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{profile?.name || "Student"}</span>
          </button>

          {showProfileMenu && (
            <div className="notif-dropdown" role="menu" style={{ top: '50px', width: '200px' }}>
              <button type="button" className="notif-item"
                role="menuitem"
                onClick={() => { setShowProfileMenu(false); navigate('/student/profile'); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}
              >
                <User size={16} /> My Profile
              </button>
              <button type="button" className="notif-item"
                role="menuitem"
                onClick={() => { setShowProfileMenu(false); logout(); navigate('/login', { replace: true }); }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--error)' }}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
