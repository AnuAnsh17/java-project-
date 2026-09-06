import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, ShieldCheck } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../common/PlaceholderLogo';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    setMobileOpen(false);
    if (id.startsWith('#')) {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => handleNavClick('#top')}>
          <div className="brand-logos">
            <CollegeLogo />
            <div className="brand-divider"></div>
            <CampusConnectLogo />
          </div>
          <div className="brand-titles">
            <span className="brand-title-product">Campus Connect</span>
            <span className="brand-title-college">Thakur Shree DPS College of Engg. & Mgmt.</span>
          </div>
        </Link>

        <ul className={`nav-menu ${mobileOpen ? 'mobile-open' : ''}`}>
          <li>
            <a href="#top" className="nav-link" onClick={() => handleNavClick('#top')}>Home</a>
          </li>
          <li>
            <a href="#about" className="nav-link" onClick={() => handleNavClick('#about')}>About</a>
          </li>
          <li>
            <a href="#features" className="nav-link" onClick={() => handleNavClick('#features')}>Features</a>
          </li>
          <li>
            <a href="#community" className="nav-link" onClick={() => handleNavClick('#community')}>Community</a>
          </li>
          <li>
            <a href="#roles" className="nav-link" onClick={() => handleNavClick('#roles')}>Roles</a>
          </li>
          <li>
            <button
              className="btn btn-primary"
              onClick={() => {
                setMobileOpen(false);
                navigate('/login');
              }}
            >
              <LogIn size={18} />
              Login
            </button>
          </li>
        </ul>

        <button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </nav>
  );
};
