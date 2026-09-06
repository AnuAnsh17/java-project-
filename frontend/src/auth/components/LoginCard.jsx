import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, LogIn, ShieldCheck, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { RoleSelector } from './RoleSelector';
import { CollegeEmailInput } from './CollegeEmailInput';
import { useAuth } from '../hooks/useAuth';

export const LoginCard = () => {
  const { selectedRole, setSelectedRole, validateCollegeEmail } = useAuth();
  const navigate = useNavigate();

  // Role default credentials for smooth demonstration
  const roleDefaults = {
    student: {
      name: 'Anurag Yadav',
      desc: 'First Year IT Div C (Roll: IT202501)',
      email: 'anurag.yadav@tsdcem.ac.in',
      path: '/student'
    },
    faculty: {
      name: 'Prof. Sumeet Rathod',
      desc: 'Dept. of Information Technology (MCA, IT div C,D)',
      email: 'sumeet.rathod@tsdcem.ac.in',
      path: '/faculty'
    },
    admin: {
      name: 'Office of Academic Affairs',
      desc: 'Campus Administration & Moderation',
      email: 'admin@tsdcem.ac.in',
      path: '/admin'
    }
  };

  const [email, setEmail] = useState(roleDefaults[selectedRole]?.email || 'anurag.yadav@tsdcem.ac.in');
  const [password, setPassword] = useState('••••••••••••');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setEmail(roleDefaults[role]?.email || '');
    setEmailError('');
  };

  const handleBlur = () => {
    setTouched(true);
    if (!email) {
      setEmailError('College email is required.');
    } else if (!validateCollegeEmail(email)) {
      setEmailError('Campus Connect is restricted to authorized @tsdcem.ac.in accounts.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!email || !validateCollegeEmail(email)) {
      setEmailError('Campus Connect is restricted to authorized @tsdcem.ac.in accounts.');
      return;
    }

    setEmailError('');
    const targetPath = roleDefaults[selectedRole]?.path || `/${selectedRole}`;
    navigate(targetPath);
  };

  const handleQuickEnter = (role) => {
    setSelectedRole(role);
    const targetPath = roleDefaults[role]?.path || `/${role}`;
    navigate(targetPath);
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Member Login</h2>
        <p className="auth-subtitle">
          Select your institutional role to enter the portal
        </p>
      </div>

      <div className="auth-restriction-notice">
        <ShieldCheck size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>College Email Restriction</strong>
          <div style={{ marginTop: '2px' }}>
            Campus Connect is restricted to official <strong>@tsdcem.ac.in</strong> institutional accounts.
          </div>
        </div>
      </div>

      {/* Quick 1-Click Role Direct Launch Buttons */}
      <div style={{ marginBottom: '1.5rem' }}>
        <label className="role-selector-label" style={{ marginBottom: '0.6rem' }}>
          Direct Demo Access (1-Click)
        </label>
        <div style={{ display: 'grid', gap: '0.6rem' }}>
          <button
            type="button"
            className="btn btn-outline"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '0.65rem 0.85rem',
              borderColor: selectedRole === 'student' ? 'var(--primary)' : 'var(--border-subtle)',
              background: selectedRole === 'student' ? '#f0fdf4' : 'transparent',
              textAlign: 'left',
              width: '100%'
            }}
            onClick={() => handleQuickEnter('student')}
          >
            <GraduationCap size={20} color="#15803d" style={{ flexShrink: 0, marginRight: '8px' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0f172a' }}>Enter as Student: Anurag Yadav</div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>IT • First Year Div C • Roll: IT202501</div>
            </div>
            <ArrowRight size={16} color="#64748b" />
          </button>

          <button
            type="button"
            className="btn btn-outline"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '0.65rem 0.85rem',
              borderColor: selectedRole === 'faculty' ? 'var(--primary)' : 'var(--border-subtle)',
              background: selectedRole === 'faculty' ? '#eff6ff' : 'transparent',
              textAlign: 'left',
              width: '100%'
            }}
            onClick={() => handleQuickEnter('faculty')}
          >
            <Briefcase size={20} color="#002855" style={{ flexShrink: 0, marginRight: '8px' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0f172a' }}>Enter as Faculty: Prof. Sumeet Rathod</div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>IT Department • MCA, IT div C,D</div>
            </div>
            <ArrowRight size={16} color="#64748b" />
          </button>

          <button
            type="button"
            className="btn btn-outline"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              padding: '0.65rem 0.85rem',
              borderColor: selectedRole === 'admin' ? 'var(--primary)' : 'var(--border-subtle)',
              background: selectedRole === 'admin' ? '#fefce8' : 'transparent',
              textAlign: 'left',
              width: '100%'
            }}
            onClick={() => handleQuickEnter('admin')}
          >
            <ShieldCheck size={20} color="#b45309" style={{ flexShrink: 0, marginRight: '8px' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0f172a' }}>Enter as Admin: Central Administration</div>
              <div style={{ fontSize: '0.76rem', color: '#64748b' }}>Office of Academic & Campus Affairs</div>
            </div>
            <ArrowRight size={16} color="#64748b" />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '1.25rem 0', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Or Sign In with Form
        </span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }}></div>
      </div>

      <form onSubmit={handleSubmit}>
        <RoleSelector
          selectedRole={selectedRole}
          onRoleChange={handleRoleChange}
        />

        <CollegeEmailInput
          email={email}
          setEmail={(val) => {
            setEmail(val);
            if (touched) {
              if (validateCollegeEmail(val)) {
                setEmailError('');
              }
            }
          }}
          error={emailError}
          touched={touched}
          onBlur={handleBlur}
        />

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={18} />
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          <LogIn size={18} />
          Login to {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Portal
        </button>
      </form>

      <p className="auth-footer-text">
        Account authentication is restricted to registered members of Thakur Shree DPS College of Engineering and Management.
      </p>
    </div>
  );
};
