import api from '../../services/api';

const mapAssignment = (item) => ({
  ...item,
  deadline: item.dueDate,
  instructions: item.description,
  status: item.status || 'PENDING',
  marks: null
});

export const assignmentService = {
  async getAssignments() {
    const response = await api.get('/assignments');
    return response.data.map(mapAssignment);
  },
  async getAssignmentById(id) {
    const response = await api.get(`/assignments/${id}`);
    return mapAssignment(response.data);
  }
};
