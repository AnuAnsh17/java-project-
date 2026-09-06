import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { GraduationCap, Briefcase, ShieldCheck, Home } from 'lucide-react';

export const DemoHeaderBar = () => {
  const { activeRole, switchRole } = useDemo();
  const navigate = useNavigate();

  const handleRoleSelect = (role, path) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div className="demo-header-bar">
      <div className="demo-header-title">
        <span className="demo-live-badge">PRESENTATION MODE</span>
        <span className="demo-title-text">Campus Connect Interactive Demo</span>
      </div>

      <div className="demo-role-buttons">
        <button
          className={`demo-role-btn ${activeRole === 'student' ? 'active' : ''}`}
          onClick={() => handleRoleSelect('student', '/student')}
        >
          <GraduationCap size={15} /> Student Portal
        </button>

        <button
          className={`demo-role-btn ${activeRole === 'faculty' ? 'active' : ''}`}
          onClick={() => handleRoleSelect('faculty', '/faculty')}
        >
          <Briefcase size={15} /> Faculty Workspace
        </button>

        <button
          className={`demo-role-btn ${activeRole === 'admin' ? 'active' : ''}`}
          onClick={() => handleRoleSelect('admin', '/admin')}
        >
          <ShieldCheck size={15} /> Admin Center
        </button>

        <button
          className={`demo-role-btn demo-home-btn`}
          onClick={() => handleRoleSelect('guest', '/')}
        >
          <Home size={15} /> Presentation Hub
        </button>
      </div>
    </div>
  );
};
