import React from 'react';

export const DashboardCard = ({ title, value, subtitle, icon: Icon, color = "var(--primary-light)" }) => {
  return (
    <div className="student-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
        {Icon && <Icon size={26} />}
      </div>
      <div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{title}</div>
        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary-dark)', margin: '2px 0' }}>{value}</div>
        {subtitle && <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{subtitle}</div>}
      </div>
    </div>
  );
};
