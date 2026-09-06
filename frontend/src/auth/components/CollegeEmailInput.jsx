import React from 'react';
import { Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CollegeEmailInput = ({ email, setEmail, error, touched, onBlur }) => {
  const isDomainValid = email.toLowerCase().trim().endsWith('@tsdcem.ac.in');

  return (
    <div className="form-group">
      <label className="form-label" htmlFor="collegeEmail">
        Official College Email
      </label>
      <div className="input-wrapper">
        <Mail className="input-icon" size={18} />
        <input
          id="collegeEmail"
          type="email"
          className={`form-input ${error ? 'is-invalid' : ''}`}
          placeholder="yourname@tsdcem.ac.in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={onBlur}
          required
        />
      </div>

      {error && (
        <div className="validation-error">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {!error && email.length > 5 && isDomainValid && (
        <div className="domain-hint" style={{ color: '#10b981' }}>
          <CheckCircle2 size={14} />
          Valid TSDCEM institutional email domain
        </div>
      )}

      {!error && (!touched || email.length <= 5) && (
        <div className="domain-hint">
          Must end with <strong>@tsdcem.ac.in</strong>
        </div>
      )}
    </div>
  );
};
