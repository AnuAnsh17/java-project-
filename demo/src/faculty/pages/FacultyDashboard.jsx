import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFaculty } from '../hooks/useFaculty';
import { classService } from '../services/classService';
import { assignmentService } from '../services/assignmentService';
import { submissionService } from '../services/submissionService';
import { teamService } from '../services/teamService';
import { ClassCard } from '../components/ClassCard';
import { AssignmentCardFaculty } from '../components/AssignmentCard';
import { PlusCircle, UserCheck, FileCheck, GraduationCap, Bell } from 'lucide-react';

export const FacultyDashboard = () => {
  const { facultyProfile } = useFaculty();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function load() {
      const cls = await classService.getClasses();
      const asgns = await assignmentService.getAssignments();
      const subs = await submissionService.getSubmissions();
      const t = await teamService.getTeams();
      setClasses(cls);
      setAssignments(asgns);
      setSubmissions(subs);
      setTeams(t);
    }
    load();
  }, []);

  return (
    <div>
      <div className="student-card" style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: 'white', marginBottom: '2rem' }}>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '0.4rem' }}>
          Welcome back, {facultyProfile?.name || "Faculty Member"} 👋
        </h1>
        <p style={{ color: '#e0f2fe', fontSize: '0.95rem' }}>
          {facultyProfile?.department} • {facultyProfile?.designation}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button className="btn btn-primary" onClick={() => navigate('/faculty/assignments/create')}>
          <PlusCircle size={18} /> Create Assignment
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/faculty/attendance/take')}>
          <UserCheck size={18} /> Take Attendance
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/faculty/teams/create')}>
          <GraduationCap size={18} /> Create Academic Team
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/faculty/announcements')}>
          <Bell size={18} /> Post Announcement
        </button>
      </div>

      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="student-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/faculty/classes')}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Assigned Classes</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-light)', margin: '0.2rem 0' }}>{classes.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active course workloads</div>
        </div>

        <div className="student-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/faculty/submissions')}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pending Submissions</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--warning)', margin: '0.2rem 0' }}>
            {submissions.filter(s => s.status === 'Submitted').length}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Requires grading & feedback</div>
        </div>

        <div className="student-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/faculty/teams')}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Academic Teams</div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--success)', margin: '0.2rem 0' }}>{teams.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Faculty-managed groups</div>
        </div>
      </div>

      <div className="grid-2">
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>My Assigned Classes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {classes.map(c => <ClassCard key={c.id} classItem={c} />)}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary-dark)' }}>Recent Course Assignments</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {assignments.map(a => <AssignmentCardFaculty key={a.id} assignment={a} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
