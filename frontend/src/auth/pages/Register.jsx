import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../../components/common/PlaceholderLogo';
import { RegisterCard } from '../components/RegisterCard';
import '../styles/auth.css';

export const Register = () => (
  <div className="auth-page">
    <header className="auth-navbar">
      <div className="container auth-navbar-inner">
        <Link to="/" className="auth-back-link"><ArrowLeft size={18} /> Back to Campus Connect</Link>
        <div className="auth-brand-lockup">
          <CollegeLogo className="brand-logo-img" style={{ height: '36px' }} />
          <div className="brand-divider" style={{ height: '20px' }} />
          <CampusConnectLogo className="brand-logo-img" style={{ height: '36px' }} />
        </div>
      </div>
    </header>
    <main className="auth-container">
      <div className="auth-card-wrapper animate-fade-in"><RegisterCard /></div>
    </main>
  </div>
);
