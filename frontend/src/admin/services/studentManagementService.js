import api from '../../services/api';

const mapStudent = (student) => ({
  ...student,
  rollNo: '—',
  branch: student.department || '—',
  organizations: [],
  status: 'Registered'
});

export const studentManagementService = {
  async getStudents() {
    const response = await api.get('/students');
    return response.data.filter((student) => student.role === 'STUDENT').map(mapStudent);
  },
  async deleteStudent(id) { await api.delete(`/students/${id}`); }
};
