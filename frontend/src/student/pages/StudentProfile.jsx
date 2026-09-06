import React from 'react';
import { useStudent } from '../hooks/useStudent';
import { User, Mail, GraduationCap, Award, Briefcase } from 'lucide-react';

export const StudentProfile = () => {
  const { profile } = useStudent();

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Student Profile</h1>
          <p>Your academic identity and campus organization memberships</p>
        </div>
      </div>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <img
            src={profile?.avatar}
            alt={profile?.name}
            style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-light)' }}
          />

          <div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.2rem' }}>{profile?.name}</h2>
            <p style={{ color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.4rem' }}>
              Second Year IT • Div C
            </p>
            <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              <span><Mail size={14} style={{ display: 'inline', marginRight: '4px' }} />{profile?.email}</span>
              <span>Division: {profile?.division}</span>
              <span>Roll No: {profile?.rollNo}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="student-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={18} color="var(--primary-light)" />
            Organizational Responsibilities
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {profile?.organizations.map((org, i) => (
              <div key={i} style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{org.name}</div>
                <div style={{ color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: '600' }}>Position: {org.role}</div>
                <span className="badge badge-trust" style={{ marginTop: '4px', fontSize: '0.7rem' }}>{org.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="student-card">
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} color="var(--gold)" />
            Interests & Bio
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1rem', lineHeight: '1.6' }}>
            {profile?.bio}
          </p>

          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Interests</h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {profile?.interests.map((int, i) => (
              <span key={i} className="badge badge-trust" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                {int}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
