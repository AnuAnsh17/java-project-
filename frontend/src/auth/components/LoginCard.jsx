import React, { useState } from 'react';
import { Lock, LogIn, ShieldCheck, AlertCircle } from 'lucide-react';
import { RoleSelector } from './RoleSelector';
import { CollegeEmailInput } from './CollegeEmailInput';
import { useAuth } from '../hooks/useAuth';

export const LoginCard = () => {
  const { selectedRole, setSelectedRole, validateCollegeEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [touched, setTouched] = useState(false);
  const [devNotice, setDevNotice] = useState('');

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
    // Frontend UI validation foundation ready for Spring Boot REST API integration
    setDevNotice(
      `Frontend UI validation passed for ${selectedRole.toUpperCase()} (${email}). Backend Spring Boot REST API connection pending for server-side authentication.`
    );
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Member Login</h2>
        <p className="auth-subtitle">
          Access your {selectedRole} account on Campus Connect
        </p>
      </div>

      <div className="auth-restriction-notice">
        <ShieldCheck size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong>College Email Restriction</strong>
          <div style={{ marginTop: '2px' }}>
            Use your official <strong>@tsdcem.ac.in</strong> institutional email address.
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <RoleSelector
          selectedRole={selectedRole}
          onRoleChange={(role) => {
            setSelectedRole(role);
            setDevNotice('');
          }}
        />

        <CollegeEmailInput
          email={email}
          setEmail={(val) => {
            setEmail(val);
            setDevNotice('');
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
          Login as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
        </button>
      </form>

      {devNotice && (
        <div className="dev-state-box">
          <AlertCircle size={18} style={{ marginBottom: '4px' }} />
          <div>{devNotice}</div>
        </div>
      )}

      <p className="auth-footer-text">
        Account creation is managed exclusively by Thakur Shree DPS College Administration.
      </p>
    </div>
  );
};
