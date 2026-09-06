import React, { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import { Activity } from 'lucide-react';

export const MyActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function load() {
      const act = await studentService.getActivity();
      setActivities(act);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>My Activity Log</h1>
          <p>History of your campus posts, event registrations, and election participation</p>
        </div>
      </div>

      <div className="student-card">
        {activities.map((act, i) => (
          <div key={i} style={{ padding: '0.85rem 0', borderBottom: i < activities.length - 1 ? '1px solid var(--border-light)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Activity size={18} color="var(--primary-light)" />
              <span style={{ fontWeight: '600', fontSize: '0.92rem' }}>{act.title}</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{act.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
