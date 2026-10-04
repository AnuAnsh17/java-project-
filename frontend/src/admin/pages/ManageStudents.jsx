import React, { useState, useEffect } from 'react';
import { studentManagementService } from '../services/studentManagementService';
import { StudentTable } from '../components/StudentTable';
import { Search, UserCheck } from 'lucide-react';

export const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try { setStudents(await studentManagementService.getStudents()); }
      catch (requestError) { setError(requestError.response?.data?.detail || 'Student records could not be loaded.'); }
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    try {
      await studentManagementService.deleteStudent(id);
      setStudents((items) => items.filter((student) => student.id !== id));
    } catch (requestError) { setError(requestError.response?.data?.detail || 'Student could not be deleted.'); }
  };

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || s.department === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Student Management</h1>
          <p>Institutional record of enrolled students and organizational assignments</p>
        </div>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search-wrapper">
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            className="admin-search-input"
            placeholder="Search by name, email, or roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className="form-input" style={{ width: '220px' }} value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="All">All Branches</option>
          <option value="Information Technology">Information Technology</option>
          <option value="Computer Engineering">Computer Engineering</option>
          <option value="EXTC">EXTC</option>
        </select>
      </div>

      {error && <div className="student-card" role="alert">{error}</div>}
      <StudentTable students={filtered} onDelete={handleDelete} onViewDetail={(std) => setSelectedDetail(std)} />

      {selectedDetail && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Student Details: {selectedDetail.name}</h3>
            <p><strong>Email:</strong> {selectedDetail.email}</p>
            <p><strong>Department & Year:</strong> {selectedDetail.department || '—'} ({selectedDetail.year || '—'} - Div {selectedDetail.division || '—'})</p>
            <p><strong>Bio:</strong> {selectedDetail.bio || 'No profile bio has been added.'}</p>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn btn-outline" onClick={() => setSelectedDetail(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
