import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Campus Connect</h3>
            <p className="college-full-name">
              Thakur Shree DPS College of Engineering and Management
            </p>
            <p style={{ marginTop: '0.8rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              A private digital ecosystem connecting students, faculty, organizations, and administration.
            </p>
          </div>

          <div className="footer-col">
            <h4>Platform</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#roles">Role Access</a></li>
              <li><a href="#complaints">Grievance Portal</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Access & Trust</h4>
            <ul className="footer-links">
              <li><Link to="/login">Member Login</Link></li>
              <li style={{ color: '#38bdf8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.4rem' }}>
                <Shield size={14} /> Domain Restricted (@tsdcem.ac.in)
              </li>
              <li style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Lock size={14} /> Private Campus Infrastructure
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Campus Connect — Thakur Shree DPS College of Engineering and Management. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
