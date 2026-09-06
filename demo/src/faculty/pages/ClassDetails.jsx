import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { classService } from '../services/classService';
import { ArrowLeft, BookOpen, Users, Clock } from 'lucide-react';

export const ClassDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cls, setCls] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function load() {
      const c = await classService.getClassById(id || 'cls-1');
      const st = await classService.getClassStudents(id || 'cls-1');
      setCls(c);
      setStudents(st);
    }
    load();
  }, [id]);

  if (!cls) return <div>Loading class details...</div>;

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/faculty/classes')}>
        <ArrowLeft size={16} /> Back to Classes
      </button>

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge-trust" style={{ marginBottom: '0.5rem' }}>{cls.subjectCode}</span>
        <h1 style={{ fontSize: '1.6rem', color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>{cls.subjectName}</h1>
        <p style={{ color: 'var(--primary-light)', fontWeight: '600', marginBottom: '0.85rem' }}>
          {cls.year} — {cls.division} ({cls.department})
        </p>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', gap: '2rem' }}>
          <span><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Schedule: {cls.schedule}</span>
          <span><Users size={14} style={{ display: 'inline', marginRight: '4px' }} /> Enrolled: {cls.studentsCount} Students</span>
        </div>
      </div>

      <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Enrolled Student Roster</h3>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>College Email</th>
              <th>Attendance Percentage</th>
              <th>Assignment Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{s.rollNo}</td>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{s.name}</td>
                <td>{s.email}</td>
                <td style={{ fontWeight: '700', color: s.attendancePercentage >= 75 ? 'var(--success)' : 'var(--error)' }}>
                  {s.attendancePercentage}%
                </td>
                <td><span className="badge badge-trust">{s.assignmentStatus}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
