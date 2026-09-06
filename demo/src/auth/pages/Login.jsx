import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../../components/common/PlaceholderLogo';
import { LoginCard } from '../components/LoginCard';
import '../styles/auth.css';

export const Login = () => {
  return (
    <div className="auth-page">
      <header className="auth-navbar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/landing" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--primary)', fontSize: '0.92rem' }}>
            <ArrowLeft size={18} />
            Back to Campus Connect
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <CollegeLogo className="brand-logo-img" style={{ height: '36px' }} />
            <div className="brand-divider" style={{ height: '20px' }}></div>
            <CampusConnectLogo className="brand-logo-img" style={{ height: '36px' }} />
          </div>
        </div>
      </header>

      <main className="auth-container">
        <div className="auth-card-wrapper animate-fade-in">
          <LoginCard />
        </div>
      </main>
    </div>
  );
};
