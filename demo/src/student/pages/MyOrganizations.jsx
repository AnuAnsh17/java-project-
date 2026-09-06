import React from 'react';
import { useStudent } from '../hooks/useStudent';
import { Briefcase, Award } from 'lucide-react';

export const MyOrganizations = () => {
  const { profile } = useStudent();

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>My Organizations & Leadership</h1>
          <p>Overview of campus clubs, committees, and council positions held</p>
        </div>
      </div>

      <div className="grid-2">
        {profile?.organizations.map((org, i) => (
          <div key={i} className="student-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <Briefcase size={22} color="var(--primary-light)" />
              <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)' }}>{org.name}</h3>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--primary-light)', fontWeight: '700', marginBottom: '0.5rem' }}>
              Position: {org.role}
            </div>
            <span className="badge badge-trust">{org.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
