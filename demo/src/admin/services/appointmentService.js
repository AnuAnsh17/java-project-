import api from '../../services/api';
import { mockAppointmentsAdmin } from '../mock/mockAppointments';

let appointmentsStore = [...mockAppointmentsAdmin];

export const appointmentService = {
  async getAppointments() {
    return Promise.resolve(appointmentsStore);
  },

  async createAppointment(data) {
    const newApp = {
      id: `app-${Date.now()}`,
      studentName: data.studentName,
      studentEmail: data.studentEmail,
      organization: data.organization,
      position: data.position,
      startDate: "Aug 2026",
      endDate: "May 2027",
      status: "Active",
      assignedBy: "College Admin"
    };
    appointmentsStore.unshift(newApp);
    return Promise.resolve(newApp);
  }
};
