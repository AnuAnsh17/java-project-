import api from '../../services/api';

const mapEvent = (event) => ({ ...event, venue: event.location, registrationsCount: null, status: 'Published' });

export const eventManagementService = {
  async getEvents() {
    const response = await api.get('/events');
    return response.data.map(mapEvent);
  },
  async createEvent(data) {
    const response = await api.post('/events', {
      title: data.title,
      organizer: data.organizer,
      date: data.date,
      time: data.time || '10:00 AM',
      location: data.venue,
      category: data.category || 'Campus'
    });
    return mapEvent(response.data);
  },
  async deleteEvent(id) { await api.delete(`/events/${id}`); }
};
