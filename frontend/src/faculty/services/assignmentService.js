import api from '../../services/api';
import { mockAssignmentsFaculty } from '../mock/mockAssignments';

let assignmentsStore = [...mockAssignmentsFaculty];

export const assignmentService = {
  async getAssignments() {
    return Promise.resolve(assignmentsStore);
  },

  async getAssignmentById(id) {
    const asgn = assignmentsStore.find(a => a.id === id);
    return Promise.resolve(asgn || null);
  },

  async createAssignment(data) {
    const newAsgn = {
      id: `asgn-${Date.now()}`,
      title: data.title,
      subject: data.subject || "Java Programming (IT302)",
      targetClass: data.targetClass || "SE IT Division A",
      deadline: data.deadline,
      totalMarks: Number(data.totalMarks) || 20,
      submissionsCount: 0,
      totalStudents: 65,
      status: "Active",
      instructions: data.instructions
    };
    assignmentsStore.unshift(newAsgn);
    return Promise.resolve(newAsgn);
  }
};
