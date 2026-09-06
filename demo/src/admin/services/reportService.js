import api from '../../services/api';
import { mockReportsAdmin } from '../mock/mockReports';

let reportsStore = [...mockReportsAdmin];

export const reportService = {
  async getReports() {
    return Promise.resolve(reportsStore);
  },

  async getReportById(id) {
    const r = reportsStore.find(rep => rep.id === id);
    return Promise.resolve(r || null);
  },

  async updateReport(id, updateData) {
    reportsStore = reportsStore.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: updateData.status || r.status,
          internalNotes: updateData.internalNotes || r.internalNotes,
          resolutionResponse: updateData.resolutionResponse || r.resolutionResponse,
          assignedAdmin: updateData.assignedAdmin || r.assignedAdmin
        };
      }
      return r;
    });
    return Promise.resolve(reportsStore.find(r => r.id === id));
  }
};
