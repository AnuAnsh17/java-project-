import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/appointmentService';
import { UserCheck, PlusCircle } from 'lucide-react';

export const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [organization, setOrganization] = useState('Coding Club');
  const [position, setPosition] = useState('President');

  useEffect(() => {
    async function load() {
      const data = await appointmentService.getAppointments();
      setAppointments(data);
    }
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;
    await appointmentService.createAppointment({ studentName, studentEmail, organization, position });
    const updated = await appointmentService.getAppointments();
    setAppointments(updated);
    setStudentName('');
    setStudentEmail('');
    setShowModal(false);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Appointments & Organizational Positions</h1>
          <p>Assign and record student leadership responsibilities across clubs & committees</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <PlusCircle size={18} /> Create Appointment
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Appointed Student</th>
              <th>College Email</th>
              <th>Organization</th>
              <th>Position Assigned</th>
              <th>Tenure</th>
              <th>Assigned By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id}>
                <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{app.studentName}</td>
                <td>{app.studentEmail}</td>
                <td><span className="badge badge-trust">{app.organization}</span></td>
                <td style={{ fontWeight: '700', color: 'var(--primary-light)' }}>{app.position}</td>
                <td>{app.startDate} - {app.endDate}</td>
                <td>{app.assignedBy}</td>
                <td><span className="status-badge status-active">{app.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <h3>Assign Leadership Position</h3>
            <form onSubmit={handleCreate} style={{ marginTop: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input type="text" className="form-input" placeholder="e.g. Ansh Sharma" value={studentName} onChange={(e) => setStudentName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Student College Email (@tsdcem.ac.in)</label>
                <input type="email" className="form-input" placeholder="e.g. ansh.sharma@tsdcem.ac.in" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Organization</label>
                <select className="form-input" value={organization} onChange={(e) => setOrganization(e.target.value)}>
                  <option value="Coding Club">Coding Club</option>
                  <option value="Robotics Club">Robotics Club</option>
                  <option value="Student Council">Student Council</option>
                  <option value="Technical Committee">Technical Committee</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Position Title</label>
                <input type="text" className="form-input" placeholder="e.g. President / Vice President / Secretary" value={position} onChange={(e) => setPosition(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
