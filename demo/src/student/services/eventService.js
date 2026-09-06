import api from '../../services/api';
import { mockEventsData } from '../mock/mockEvents';

let eventsStore = [...mockEventsData];

export const eventService = {
  async getEvents() {
    return Promise.resolve(eventsStore);
  },

  async getEventById(id) {
    const evt = eventsStore.find(e => e.id === id);
    return Promise.resolve(evt || null);
  },

  async registerEvent(id) {
    eventsStore = eventsStore.map(e => {
      if (e.id === id) {
        return { ...e, isRegistered: true };
      }
      return e;
    });
    return Promise.resolve(eventsStore.find(e => e.id === id));
  }
};
