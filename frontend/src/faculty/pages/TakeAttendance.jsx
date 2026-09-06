import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { classService } from '../services/classService';
import { attendanceService } from '../services/attendanceService';
import { ArrowLeft, CheckCircle2, UserCheck } from 'lucide-react';

export const TakeAttendance = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [subject, setSubject] = useState('Java Programming (IT302)');
  const [targetClass, setTargetClass] = useState('SE IT Division A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    async function load() {
      const st = await classService.getClassStudents('cls-1');
      setStudents(st);
      const initialMap = {};
      st.forEach(student => { initialMap[student.id] = 'Present'; });
      setAttendanceMap(initialMap);
    }
    load();
  }, []);

  const toggleStudent = (id) => {
    setAttendanceMap(prev => ({
      ...prev,
      [id]: prev[id] === 'Present' ? 'Absent' : 'Present'
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await attendanceService.saveAttendance({ date, subject, targetClass, attendanceMap });
    setSavedMsg('Attendance register recorded successfully!');
    setTimeout(() => navigate('/faculty/attendance'), 1200);
  };

  return (
    <div>
      <button className="btn btn-outline" style={{ marginBottom: '1.25rem' }} onClick={() => navigate('/faculty/attendance')}>
        <ArrowLeft size={16} /> Back to Attendance Portal
      </button>

      {savedMsg && (
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: 'var(--radius-md)', color: '#15803d', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /> {savedMsg}
        </div>
      )}

      <div className="student-card" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-dark)', marginBottom: '1.25rem' }}>Take Attendance Register</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Subject</label>
            <select className="form-input" value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="Java Programming (IT302)">Java Programming (IT302)</option>
              <option value="Distributed Systems (IT401)">Distributed Systems (IT401)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Target Class / Division</label>
            <select className="form-input" value={targetClass} onChange={(e) => setTargetClass(e.target.value)}>
              <option value="SE IT Division A">SE IT Division A</option>
              <option value="BE IT Division B">BE IT Division B</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="admin-table-container" style={{ marginBottom: '1.5rem' }}>
          <table className="attendance-register-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>College Email</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: '600' }}>{s.rollNo}</td>
                  <td style={{ fontWeight: '600' }}>{s.name}</td>
                  <td>{s.email}</td>
                  <td>
                    <button
                      type="button"
                      className={`attendance-toggle-btn ${attendanceMap[s.id] === 'Present' ? 'btn-present' : 'btn-absent'}`}
                      onClick={() => toggleStudent(s.id)}
                    >
                      {attendanceMap[s.id] || 'Present'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
          <UserCheck size={18} /> Save & Submit Register
        </button>
      </form>
    </div>
  );
};
