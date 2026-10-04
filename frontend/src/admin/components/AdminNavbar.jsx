import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, ShieldCheck, User } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../../components/common/PlaceholderLogo';
import { useAdmin } from '../hooks/useAdmin';
import { useAuth } from '../../auth/hooks/useAuth';

export const AdminNavbar = ({ onToggleSidebar, mobileOpen }) => {
  const { adminProfile } = useAdmin();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="admin-top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="button" className="btn d-lg-none" onClick={onToggleSidebar} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} style={{ color: 'var(--text-primary)', padding: '0' }}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CollegeLogo className="brand-logo-img" style={{ height: '34px' }} />
          <div className="brand-divider" style={{ height: '20px', backgroundColor: '#334155' }}></div>
          <CampusConnectLogo className="brand-logo-img" style={{ height: '34px' }} />
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'white', marginLeft: '4px' }}>
            Campus Connect <span style={{ color: '#38bdf8', fontSize: '0.8rem', fontWeight: '600' }}>[TSDCEM • ADMIN]</span>
          </span>
        </Link>
      </div>

      <div style={{ position: 'relative' }}>
        <button type="button"
          className="student-user-pill"
          style={{ background: '#1e293b', borderColor: '#334155', color: 'white' }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          aria-expanded={showProfileMenu}
          aria-haspopup="menu"
        >
          <ShieldCheck size={20} color="#38bdf8" />
          <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{adminProfile?.name || "College Admin"}</span>
        </button>

        {showProfileMenu && (
          <div className="notif-dropdown" role="menu" style={{ top: '50px', width: '200px' }}>
            <button type="button" className="notif-item" role="menuitem"
              onClick={() => { setShowProfileMenu(false); navigate('/admin/profile'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}
            >
              <User size={16} /> Admin Profile
            </button>
            <button type="button" className="notif-item" role="menuitem"
              onClick={() => { setShowProfileMenu(false); logout(); navigate('/login', { replace: true }); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#f87171' }}
            >
              <LogOut size={16} /> Logout Session
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
