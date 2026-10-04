import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, GraduationCap, Briefcase, Calendar, Vote, ShieldAlert, ArrowRight, RefreshCw, Sparkles } from 'lucide-react';
import { adminService } from '../services/adminService';
import { DashboardCard } from '../components/DashboardCard';
import { apiErrorMessage } from '../../services/api';

export const AdminDashboard = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setOverview(await adminService.getDashboardMetrics());
    } catch (requestError) {
      setError(apiErrorMessage(requestError, 'Administration data could not be loaded.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadOverview(); }, [loadOverview]);
  const metrics = overview?.metrics;

  return (
    <div className="workspace-page">
      <section className="dashboard-hero admin-hero">
        <div className="dashboard-hero-copy">
          <div className="dashboard-eyebrow"><Sparkles size={15} /> CAMPUS OPERATIONS</div>
          <h1>Administration overview</h1>
          <p>A clear view of your college community and current activity.</p>
        </div>
        <div className="dashboard-hero-actions">
          <button className="btn btn-hero-primary" onClick={() => navigate('/admin/students')}><Users size={17} /> Manage students</button>
          <button className="btn btn-hero-secondary" onClick={() => navigate('/admin/notices')}>Publish a notice <ArrowRight size={16} /></button>
        </div>
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      </section>

      {error && <div className="student-card api-error-state" role="alert"><span>{error}</span><button className="btn btn-outline" onClick={loadOverview}><RefreshCw size={15} /> Retry</button></div>}
      {loading && <div className="dashboard-loading-grid" role="status" aria-label="Loading administration overview"><div /><div /><div /><div /><div /><div /></div>}
      {!loading && !error && metrics && <>
        <div className="dashboard-stats-grid admin-stats-grid" aria-label="Campus totals">
          <DashboardCard title="Students" value={metrics.totalStudents} subtitle="Registered accounts" icon={Users} color="#286b77" />
          <DashboardCard title="Faculty" value={metrics.totalFaculty} subtitle="Provisioned accounts" icon={GraduationCap} color="#4b75a6" />
          <DashboardCard title="Clubs" value={metrics.activeClubs} subtitle="Campus organizations" icon={Briefcase} color="#c56b3d" />
          <DashboardCard title="Events" value={metrics.upcomingEvents} subtitle="Published events" icon={Calendar} color="#7c6aaa" />
          <DashboardCard title="Active elections" value={metrics.activeElections} subtitle="Open for participation" icon={Vote} color="#438b83" />
          <DashboardCard title="Open complaints" value={metrics.pendingReports} subtitle="Awaiting review" icon={ShieldAlert} color="#bb5d53" />
        </div>
        <div className="grid-2 admin-overview-lists">
          <section className="student-card">
            <div className="student-section-heading"><div><span className="section-kicker">NEEDS ATTENTION</span><h2>Recent complaints</h2></div><button className="btn btn-quiet" onClick={() => navigate('/admin/reports')}>View list <ArrowRight size={14} /></button></div>
            {overview.recentComplaints.map((item) => <div className="overview-list-row" key={item.id}><span className="overview-row-mark complaint-mark"><ShieldAlert size={16} /></span><div><strong>{item.title}</strong><p>{item.category} · {item.status}</p></div><span className="badge badge-status">{item.status}</span></div>)}
            {!overview.recentComplaints.length && <div className="compact-empty">No complaints have been filed.</div>}
          </section>
          <section className="student-card">
            <div className="student-section-heading"><div><span className="section-kicker">CAMPUS VOTING</span><h2>Elections</h2></div><button className="btn btn-quiet" onClick={() => navigate('/admin/elections')}>View list <ArrowRight size={14} /></button></div>
            {overview.recentElections.map((item) => <div className="overview-list-row" key={item.id}><span className="overview-row-mark election-mark"><Vote size={16} /></span><div><strong>{item.title}</strong><p>{item.position} · {item.status}</p></div><span className="badge badge-status">{item.status}</span></div>)}
            {!overview.recentElections.length && <div className="compact-empty">No elections have been created.</div>}
          </section>
        </div>
      </>}
    </div>
  );
};
