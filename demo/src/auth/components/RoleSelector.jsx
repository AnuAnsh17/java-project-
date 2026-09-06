import React from 'react';
import { GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';

export const RoleSelector = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="role-selector-container">
      <label className="role-selector-label">Select Access Role</label>
      <div className="role-tabs">
        <button
          type="button"
          className={`role-tab ${selectedRole === 'student' ? 'active' : ''}`}
          onClick={() => onRoleChange('student')}
        >
          <GraduationCap size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
          Student
        </button>

        <button
          type="button"
          className={`role-tab ${selectedRole === 'faculty' ? 'active' : ''}`}
          onClick={() => onRoleChange('faculty')}
        >
          <Briefcase size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
          Faculty
        </button>

        <button
          type="button"
          className={`role-tab ${selectedRole === 'admin' ? 'active' : ''}`}
          onClick={() => onRoleChange('admin')}
        >
          <ShieldCheck size={16} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} />
          Admin
        </button>
      </div>
    </div>
  );
};
