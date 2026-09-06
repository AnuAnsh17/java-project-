import api from '../../services/api';
import { mockAttendanceRecordsFaculty } from '../mock/mockAttendance';

let attendanceStore = [...mockAttendanceRecordsFaculty];

export const attendanceService = {
  async getAttendanceHistory() {
    return Promise.resolve(attendanceStore);
  },

  async saveAttendance(data) {
    const present = Object.values(data.attendanceMap).filter(v => v === 'Present').length;
    const total = Object.keys(data.attendanceMap).length;
    const absent = total - present;
    const pct = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

    const newRecord = {
      id: `att-${Date.now()}`,
      date: data.date,
      subject: data.subject,
      class: data.targetClass,
      presentCount: present,
      absentCount: absent,
      totalCount: total,
      percentage: Number(pct)
    };
    attendanceStore.unshift(newRecord);
    return Promise.resolve(newRecord);
  }
};
