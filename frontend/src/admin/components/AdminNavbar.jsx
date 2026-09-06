import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, ShieldCheck, User } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../../components/common/PlaceholderLogo';
import { useAdmin } from '../hooks/useAdmin';

export const AdminNavbar = ({ onToggleSidebar }) => {
  const { adminProfile } = useAdmin();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="admin-top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn d-lg-none" onClick={onToggleSidebar} style={{ color: 'white', padding: '0' }}>
          <Menu size={22} />
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
        <div
          className="student-user-pill"
          style={{ background: '#1e293b', borderColor: '#334155', color: 'white' }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <ShieldCheck size={20} color="#38bdf8" />
          <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{adminProfile?.name || "College Admin"}</span>
        </div>

        {showProfileMenu && (
          <div className="notif-dropdown" style={{ top: '50px', width: '200px', background: '#1e293b', borderColor: '#334155' }}>
            <div
              className="notif-item"
              onClick={() => { setShowProfileMenu(false); navigate('/admin/profile'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'white' }}
            >
              <User size={16} /> Admin Profile
            </div>
            <div
              className="notif-item"
              onClick={() => { setShowProfileMenu(false); navigate('/login'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#f87171' }}
            >
              <LogOut size={16} /> Logout Session
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
