import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, Briefcase, User } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../../components/common/PlaceholderLogo';
import { useFaculty } from '../hooks/useFaculty';

export const FacultyNavbar = ({ onToggleSidebar }) => {
  const { facultyProfile } = useFaculty();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="faculty-top-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button className="btn d-lg-none" onClick={onToggleSidebar} style={{ color: 'white', padding: '0' }}>
          <Menu size={22} />
        </button>
        <Link to="/faculty" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CollegeLogo className="brand-logo-img" style={{ height: '34px' }} />
          <div className="brand-divider" style={{ height: '20px', backgroundColor: '#0284c7' }}></div>
          <CampusConnectLogo className="brand-logo-img" style={{ height: '34px' }} />
          <span style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'white', marginLeft: '4px' }}>
            Campus Connect <span style={{ color: '#bae6fd', fontSize: '0.8rem', fontWeight: '600' }}>[FACULTY WORKSPACE]</span>
          </span>
        </Link>
      </div>

      <div style={{ position: 'relative' }}>
        <div
          className="student-user-pill"
          style={{ background: '#0284c7', borderColor: '#38bdf8', color: 'white' }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <Briefcase size={18} color="white" />
          <span style={{ fontWeight: '600', fontSize: '0.88rem' }}>{facultyProfile?.name || "Faculty Member"}</span>
        </div>

        {showProfileMenu && (
          <div className="notif-dropdown" style={{ top: '50px', width: '200px', background: '#0f172a', borderColor: '#334155' }}>
            <div
              className="notif-item"
              onClick={() => { setShowProfileMenu(false); navigate('/faculty/profile'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'white' }}
            >
              <User size={16} /> Faculty Profile
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
