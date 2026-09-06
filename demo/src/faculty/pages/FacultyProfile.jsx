import React from 'react';
import { useFaculty } from '../hooks/useFaculty';
import { Briefcase, Mail, BookOpen, GraduationCap } from 'lucide-react';

export const FacultyProfile = () => {
  const { facultyProfile } = useFaculty();

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Faculty Profile</h1>
          <p>Academic credentials, assigned courses, and department details</p>
        </div>
      </div>

      <div className="student-card" style={{ maxWidth: '650px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <img src={facultyProfile?.avatar} alt={facultyProfile?.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0284c7' }} />
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-dark)' }}>{facultyProfile?.name}</h2>
            <span className="badge badge-trust" style={{ background: '#e0f2fe', color: '#0369a1' }}>{facultyProfile?.designation}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          <div><Mail size={16} style={{ display: 'inline', marginRight: '6px' }} /> <strong>Email:</strong> {facultyProfile?.email}</div>
          <div><Briefcase size={16} style={{ display: 'inline', marginRight: '6px' }} /> <strong>Department:</strong> {facultyProfile?.department}</div>
          <div><BookOpen size={16} style={{ display: 'inline', marginRight: '6px' }} /> <strong>Assigned Subjects:</strong> {facultyProfile?.subjects.join(', ')}</div>
          <div><GraduationCap size={16} style={{ display: 'inline', marginRight: '6px' }} /> <strong>Classes:</strong> {facultyProfile?.assignedClasses.join(', ')}</div>
        </div>
      </div>
    </div>
  );
};
