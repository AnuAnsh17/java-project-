import React from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { ShieldCheck, Mail, Building2 } from 'lucide-react';

export const AdminProfile = () => {
  const { adminProfile } = useAdmin();

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Admin Account Profile</h1>
          <p>Administrative credentials and institutional governance details</p>
        </div>
      </div>

      <div className="student-card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#0f172a', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: '#38bdf8' }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)' }}>{adminProfile?.name}</h2>
            <span className="badge badge-trust">{adminProfile?.role}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <div><Mail size={16} style={{ display: 'inline', marginRight: '6px' }} /> <strong>Email:</strong> {adminProfile?.email}</div>
          <div><Building2 size={16} style={{ display: 'inline', marginRight: '6px' }} /> <strong>Administrative Unit:</strong> {adminProfile?.unit}</div>
          <div><ShieldCheck size={16} style={{ display: 'inline', marginRight: '6px' }} /> <strong>Account Status:</strong> <span className="status-badge status-active">{adminProfile?.status}</span></div>
        </div>
      </div>
    </div>
  );
};
