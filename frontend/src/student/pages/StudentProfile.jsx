import React from 'react';
import { Mail, GraduationCap, Building2, UserRound } from 'lucide-react';
import { useStudent } from '../hooks/useStudent';

export const StudentProfile = () => {
  const { profile, loading } = useStudent();
  if (loading) return <div className="student-card" role="status">Loading your profile…</div>;
  if (!profile) return <div className="student-card">Your profile could not be loaded.</div>;

  const details = [
    ['Department', profile.department || 'Not provided', Building2],
    ['Academic year', profile.year || 'Not provided', GraduationCap],
    ['Division', profile.division || 'Not provided', UserRound]
  ];

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title"><h1>Student Profile</h1><p>Your registered campus account information</p></div>
      </div>
      <section className="student-card" style={{ marginBottom: '1.25rem' }}>
        <div className="profile-identity-mark">{profile.name?.slice(0, 1).toUpperCase() || 'S'}</div>
        <div>
          <h2 style={{ color: 'var(--primary-dark)', marginBottom: '0.35rem' }}>{profile.name}</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}><Mail size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />{profile.email}</p>
          {profile.bio && <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>{profile.bio}</p>}
        </div>
      </section>
      <div className="grid-3">
        {details.map(([label, value, Icon]) => <div className="student-card profile-detail-card" key={label}>
          <Icon size={19} color="var(--primary-light)" /><div><div className="profile-detail-label">{label}</div><strong>{value}</strong></div>
        </div>)}
      </div>
      <p className="profile-data-note">Your profile is read from the Campus Connect account stored by the college system.</p>
    </div>
  );
};
