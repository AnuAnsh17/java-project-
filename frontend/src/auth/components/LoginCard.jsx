import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { apiErrorMessage } from '../../services/api';

const roleHome = { STUDENT: '/student', FACULTY: '/faculty', ADMIN: '/admin' };

export const LoginCard = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(email.trim(), password);
      navigate(roleHome[user.role] || '/student', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.status === 401
        ? 'Invalid email or password.'
        : apiErrorMessage(requestError, requestError.message || 'Sign in failed.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">Sign in with your college account</p>
      </div>
      <div className="auth-restriction-notice">
        Use your registered <strong>@tsdcem.ac.in</strong> account. Your access level is assigned by Campus Connect.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="collegeEmail">College email</label>
          <input id="collegeEmail" type="email" className="form-input" placeholder="you@tsdcem.ac.in"
            autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" size={18} />
            <input id="password" type="password" className="form-input" autoComplete="current-password"
              value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
        </div>
        {error && <div className="validation-error" role="alert">{error}</div>}
        <button type="submit" className="btn btn-primary submit-btn" disabled={submitting}>
          <LogIn size={18} /> {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="auth-footer-text">New to Campus Connect? <Link to="/register">Create a student account</Link></p>
    </div>
  );
};
