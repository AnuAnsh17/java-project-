import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';

export const AdminProfile = () => {
  const { adminProfile } = useAdmin();
  return (
    <div>
      <div className="student-page-header"><div className="student-page-title"><h1>Administrator Profile</h1><p>Your provisioned Campus Connect administrator account</p></div></div>
      <section className="student-card" style={{ maxWidth: 600 }}>
        <div className="profile-identity-mark">{adminProfile?.name?.slice(0, 1).toUpperCase() || 'A'}</div>
        <h2>{adminProfile?.name}</h2>
        <p><Mail size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />{adminProfile?.email}</p>
        <p><ShieldCheck size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Administrator</p>
      </section>
    </div>
  );
};
