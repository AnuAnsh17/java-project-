import api from '../../services/api';
import { mockAttendanceData } from '../mock/mockAttendance';

export const attendanceService = {
  async getAttendance() {
    return Promise.resolve(mockAttendanceData);
  }
};
