import api from '../../services/api';

const mapAssignment = (item) => ({
  ...item,
  deadline: item.dueDate,
  instructions: item.description,
  targetClass: 'Campus students',
  status: item.status || 'PENDING',
  totalMarks: item.totalMarks || 20,
  submissionsCount: 0
});

export const assignmentService = {
  async getAssignments() {
    const response = await api.get('/assignments');
    return response.data.map(mapAssignment);
  },
  async getAssignmentById(id) {
    const response = await api.get(`/assignments/${id}`);
    return mapAssignment(response.data);
  },
  async createAssignment(data) {
    const response = await api.post('/assignments', {
      title: data.title,
      subject: data.subject,
      dueDate: data.deadline,
      description: data.instructions,
      status: 'PENDING'
    });
    return mapAssignment(response.data);
  },
  async updateAssignment(id, data) {
    const response = await api.put(`/assignments/${id}`, data);
    return mapAssignment(response.data);
  },
  async deleteAssignment(id) { await api.delete(`/assignments/${id}`); }
};
