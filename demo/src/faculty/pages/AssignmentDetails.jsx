import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assignmentService } from '../services/assignmentService';
import { ArrowLeft, Clock, FileCheck, Users } from 'lucide-react';

export const AssignmentDetailsFaculty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);

  useEffect(() => {
    async function load() {
      const asgn = await assignmentService.getAssignmentById(id || 'asgn-1');
      setAssignment(asgn);
    }
    load();
  }, [id]);

  if (!assignment) return <div>Loading assignment details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/faculty/assignments')}>
        <ArrowLeft size={16} /> Back to Assignments
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span className="badge badge-trust">{assignment.targetClass}</span>
          <span className="status-badge status-published">{assignment.status}</span>
        </div>

        <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.4rem' }}>{assignment.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>Subject: {assignment.subject} • Max Marks: {assignment.totalMarks}</p>

        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>Instructions</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{assignment.instructions}</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={() => navigate('/faculty/submissions')}>
            <FileCheck size={18} /> View Student Submissions ({assignment.submissionsCount})
          </button>
        </div>
      </div>
    </div>
  );
};
