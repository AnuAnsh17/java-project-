import api from '../../services/api';

const mapEvent = (event) => ({ ...event, venue: event.location });

export const eventService = {
  async getEvents() {
    const response = await api.get('/events');
    return response.data.map(mapEvent);
  },

  async getEventById(id) {
    const response = await api.get(`/events/${id}`);
    return mapEvent(response.data);
  }
};
