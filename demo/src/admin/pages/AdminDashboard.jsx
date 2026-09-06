import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { reportService } from '../services/reportService';
import { electionManagementService } from '../services/electionManagementService';
import { DashboardCard } from '../components/DashboardCard';
import { Users, GraduationCap, Briefcase, Building2, Calendar, Vote, ShieldAlert } from 'lucide-react';

export const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [activeElections, setActiveElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const m = await adminService.getDashboardMetrics();
      const rep = await reportService.getReports();
      const el = await electionManagementService.getElections();
      setMetrics(m);
      setRecentReports(rep.slice(0, 2));
      setActiveElections(el);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-card" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.4rem' }}>
          Administrative Control Center
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
          Thakur Shree DPS College of Engineering and Management — Institutional Operations Portal
        </p>
      </div>

      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        <DashboardCard title="Total Students" value={metrics?.totalStudents || 1250} subtitle="Active enrollments" icon={Users} color="#2563eb" />
        <DashboardCard title="Total Faculty" value={metrics?.totalFaculty || 85} subtitle="Teaching staff" icon={GraduationCap} color="#0284c7" />
        <DashboardCard title="Active Clubs" value={metrics?.activeClubs || 12} subtitle="Student organizations" icon={Briefcase} color="#d97706" />
        <DashboardCard title="Active Committees" value={metrics?.activeCommittees || 6} subtitle="Institutional bodies" icon={Building2} color="#10b981" />
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <DashboardCard title="Upcoming Events" value={metrics?.upcomingEvents || 8} subtitle="Published on portal" icon={Calendar} color="#8b5cf6" />
        <DashboardCard title="Active Elections" value={metrics?.activeElections || 1} subtitle="Voting in progress" icon={Vote} color="#06b6d4" />
        <DashboardCard title="Pending Reports" value={metrics?.pendingReports || 2} subtitle="Requires review" icon={ShieldAlert} color="#ef4444" />
      </div>

      <div className="grid-2">
        <div className="student-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Recent Reports / Complaints</h3>
            <button className="btn btn-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }} onClick={() => navigate('/admin/reports')}>
              View All
            </button>
          </div>
          {recentReports.map(r => (
            <div key={r.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.92rem' }}>{r.subject}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category: {r.category} • Mode: {r.identityMode}</div>
            </div>
          ))}
        </div>

        <div className="student-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Active Election Overview</h3>
            <button className="btn btn-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }} onClick={() => navigate('/admin/elections')}>
              Manage
            </button>
          </div>
          {activeElections.map(el => (
            <div key={el.id} style={{ padding: '0.75rem 0' }}>
              <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{el.title}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--primary-light)' }}>Position: {el.position}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Total Votes Cast: {el.totalVotesCast}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
