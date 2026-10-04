import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Briefcase, Calendar, Vote, ShieldAlert } from 'lucide-react';
import api from '../../services/api';
import { adminService } from '../services/adminService';
import { DashboardCard } from '../components/DashboardCard';
import { apiErrorMessage } from '../../services/api';

export const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [elections, setElections] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([adminService.getDashboardMetrics(), api.get('/complaints'), api.get('/elections')])
      .then(([summary, reports, electionList]) => {
        setMetrics(summary);
        setComplaints(reports.data.slice(0, 3));
        setElections(electionList.data.slice(0, 3));
      })
      .catch((requestError) => setError(apiErrorMessage(requestError, 'Administration data could not be loaded.')));
  }, []);

  return (
    <div>
      <section className="student-card" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', marginBottom: '1.5rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.4rem' }}>Administration</h1>
        <p style={{ color: '#cbd5e1', margin: 0 }}>Campus operations and student community data</p>
      </section>
      {error && <div className="student-card" role="alert">{error}</div>}
      {!metrics ? <div className="student-card" role="status">Loading administration records…</div> : <>
        <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
          <DashboardCard title="Students" value={metrics.totalStudents} subtitle="Registered accounts" icon={Users} color="#2563eb" />
          <DashboardCard title="Faculty" value={metrics.totalFaculty} subtitle="Provisioned faculty accounts" icon={GraduationCap} color="#0284c7" />
          <DashboardCard title="Clubs" value={metrics.activeClubs} subtitle="Campus organizations" icon={Briefcase} color="#d97706" />
          <DashboardCard title="Events" value={metrics.upcomingEvents} subtitle="Published events" icon={Calendar} color="#8b5cf6" />
          <DashboardCard title="Active elections" value={metrics.activeElections} subtitle="From election records" icon={Vote} color="#06b6d4" />
          <DashboardCard title="Open complaints" value={metrics.pendingReports} subtitle="Needs review" icon={ShieldAlert} color="#ef4444" />
        </div>
        <div className="grid-2">
          <section className="student-card">
            <div className="student-section-heading"><h2>Recent complaints</h2><button className="btn btn-outline" onClick={() => navigate('/admin/reports')}>View list</button></div>
            {complaints.map((item) => <div key={item.id} style={{ padding: '.75rem 0', borderBottom: '1px solid var(--border-light)' }}><strong>{item.title}</strong><p style={{ margin: '.25rem 0', color: 'var(--text-muted)' }}>{item.category} · {item.status}</p></div>)}
            {!complaints.length && <p>No complaints have been filed.</p>}
          </section>
          <section className="student-card">
            <div className="student-section-heading"><h2>Elections</h2><button className="btn btn-outline" onClick={() => navigate('/admin/elections')}>View list</button></div>
            {elections.map((item) => <div key={item.id} style={{ padding: '.75rem 0', borderBottom: '1px solid var(--border-light)' }}><strong>{item.title}</strong><p style={{ margin: '.25rem 0', color: 'var(--text-muted)' }}>{item.position} · {item.status}</p></div>)}
            {!elections.length && <p>No elections have been created.</p>}
          </section>
        </div>
      </>}
    </div>
  );
};
