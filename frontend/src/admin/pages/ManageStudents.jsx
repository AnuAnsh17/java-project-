import React, { useState, useEffect } from 'react';
import { studentManagementService } from '../services/studentManagementService';
import { StudentTable } from '../components/StudentTable';
import { Search, UserCheck } from 'lucide-react';

export const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedDetail, setSelectedDetail] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await studentManagementService.getStudents();
      setStudents(data);
    }
    load();
  }, []);

  const handleToggleStatus = async (id) => {
    const updated = await studentManagementService.toggleStatus(id);
    setStudents(updated);
  };

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchesBranch = selectedBranch === 'All' || s.branch === selectedBranch;
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

      <StudentTable students={filtered} onToggleStatus={handleToggleStatus} onViewDetail={(std) => setSelectedDetail(std)} />

      {selectedDetail && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Student Details: {selectedDetail.name}</h3>
            <p><strong>Email:</strong> {selectedDetail.email}</p>
            <p><strong>Roll No:</strong> {selectedDetail.rollNo}</p>
            <p><strong>Branch & Year:</strong> {selectedDetail.branch} ({selectedDetail.year} - Div {selectedDetail.division})</p>
            <p><strong>Organizations:</strong> {selectedDetail.organizations.join(', ') || 'None'}</p>
            <p><strong>Status:</strong> {selectedDetail.status}</p>

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <button className="btn btn-outline" onClick={() => setSelectedDetail(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
