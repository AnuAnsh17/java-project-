import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../context/DemoContext';
import { GraduationCap, Briefcase, ShieldCheck, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { CollegeLogo, CampusConnectLogo } from '../components/common/PlaceholderLogo';
import '../styles/demo.css';

export const DemoRoleSelector = () => {
  const { switchRole } = useDemo();
  const navigate = useNavigate();

  const handleLaunchRole = (role, path) => {
    switchRole(role);
    navigate(path);
  };

  return (
    <div className="demo-role-selector-container">
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', background: 'rgba(2, 132, 199, 0.15)', padding: '0.5rem 1.25rem', borderRadius: '50px', border: '1px solid rgba(2, 132, 199, 0.3)' }}>
            <Sparkles size={18} color="#38bdf8" />
            <span style={{ color: '#38bdf8', fontWeight: '700', fontSize: '0.88rem', letterSpacing: '0.5px' }}>INTERACTIVE PRESENTATION MODE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <CollegeLogo style={{ height: '48px' }} />
            <div style={{ height: '30px', width: '2px', background: '#0284c7' }}></div>
            <CampusConnectLogo style={{ height: '48px' }} />
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '0.5rem' }}>
            Thakur Shree DPS College of Engineering and Management
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
            Campus Connect — Unified Digital Campus Ecosystem. Select a portal below to experience the complete role interface without backend login barriers.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem', marginBottom: '3rem' }}>
          
          {/* Student Card */}
          <div className="demo-role-card" onClick={() => handleLaunchRole('student', '/student')}>
            <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <GraduationCap size={30} color="white" />
            </div>

            <h2 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>Student Portal Demo</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
              Explore Reddit-style campus social feeds, category forums, club rosters, official notices, elections, assignments, attendance & complaints.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', color: '#cbd5e1', fontSize: '0.85rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Feed & Upvoting</li>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Club & Committee Memberships</li>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Assignment Submissions</li>
              <li><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Attendance Tracking & Complaints</li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: '700', fontSize: '0.95rem' }}>
              Launch Student Portal <ArrowRight size={18} />
            </div>
          </div>

          {/* Faculty Card */}
          <div className="demo-role-card" onClick={() => handleLaunchRole('faculty', '/faculty')}>
            <div style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Briefcase size={30} color="white" />
            </div>

            <h2 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>Faculty Workspace Demo</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
              Academic workspace for faculty to manage assigned classes, student rosters, create assignments, grade submissions, record attendance, and academic teams.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', color: '#cbd5e1', fontSize: '0.85rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Course Workload & Rosters</li>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Assignment Creation & Grading</li>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Attendance Register Portal</li>
              <li><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Teams & Class Announcements</li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: '700', fontSize: '0.95rem' }}>
              Launch Faculty Workspace <ArrowRight size={18} />
            </div>
          </div>

          {/* Admin Card */}
          <div className="demo-role-card" onClick={() => handleLaunchRole('admin', '/admin')}>
            <div style={{ background: 'linear-gradient(135deg, #059669, #047857)', width: '56px', height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShieldCheck size={30} color="white" />
            </div>

            <h2 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '0.5rem' }}>Admin Control Center Demo</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
              Master administrative panel to manage student and faculty accounts, clubs, committees, official notices, elections, appointments & moderation.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', color: '#cbd5e1', fontSize: '0.85rem' }}>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Student & Faculty Management</li>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Club & Committee Governance</li>
              <li style={{ marginBottom: '0.4rem' }}><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Official Notices & Elections</li>
              <li><CheckCircle2 size={14} color="#38bdf8" style={{ display: 'inline', marginRight: '6px' }} /> Moderation & Complaint Resolution</li>
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', fontWeight: '700', fontSize: '0.95rem' }}>
              Launch Admin Control Center <ArrowRight size={18} />
            </div>
          </div>

        </div>

        {/* Public Landing Link */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/landing')}
            style={{ background: 'transparent', border: '1px solid #475569', color: '#94a3b8', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            View Public College Landing Page
          </button>
        </div>

      </div>
    </div>
  );
};
