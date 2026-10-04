import api from '../../services/api';

export const facultyManagementService = {
  async getFaculty() {
    const response = await api.get('/students');
    return response.data.filter((person) => person.role === 'FACULTY').map((person) => ({
      ...person, designation: 'Faculty', subjects: [], assignedClasses: [], status: 'Registered'
    }));
  },
  async deleteFaculty(id) { await api.delete(`/students/${id}`); }
};
