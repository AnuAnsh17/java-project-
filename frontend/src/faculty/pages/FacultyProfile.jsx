import React from 'react';
import { Briefcase, Mail, Building2 } from 'lucide-react';
import { useFaculty } from '../hooks/useFaculty';

export const FacultyProfile = () => {
  const { facultyProfile } = useFaculty();
  return (
    <div>
      <div className="student-page-header"><div className="student-page-title"><h1>Faculty Profile</h1><p>Your provisioned faculty account</p></div></div>
      <div className="student-card" style={{ maxWidth: 650 }}>
        <div className="profile-identity-mark">{facultyProfile?.name?.slice(0, 1).toUpperCase() || 'F'}</div>
        <h2>{facultyProfile?.name}</h2>
        <p><Mail size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />{facultyProfile?.email}</p>
        <p><Briefcase size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Faculty account</p>
        <p><Building2 size={15} style={{ verticalAlign: 'middle', marginRight: 6 }} />Department: {facultyProfile?.department || 'Not set'}</p>
      </div>
    </div>
  );
};
