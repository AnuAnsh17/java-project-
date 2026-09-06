import api from '../../services/api';
import { mockEventsAdmin } from '../mock/mockEvents';

let eventsStore = [...mockEventsAdmin];

export const eventManagementService = {
  async getEvents() {
    return Promise.resolve(eventsStore);
  },

  async createEvent(data) {
    const newEv = {
      id: `evt-${Date.now()}`,
      title: data.title,
      organizer: data.organizer || "College Administration",
      date: data.date,
      time: data.time || "10:00 AM",
      venue: data.venue,
      registrationsCount: 0,
      status: "Published"
    };
    eventsStore.unshift(newEv);
    return Promise.resolve(newEv);
  },

  async toggleStatus(id) {
    eventsStore = eventsStore.map(e => e.id === id ? { ...e, status: e.status === 'Published' ? 'Cancelled' : 'Published' } : e);
    return Promise.resolve(eventsStore);
  }
};
