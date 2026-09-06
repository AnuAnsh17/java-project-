import React, { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';
import { EventCard } from '../components/EventCard';

export const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function load() {
      const evts = await eventService.getEvents();
      setEvents(evts);
    }
    load();
  }, []);

  const handleRegister = async (eventId) => {
    await eventService.registerEvent(eventId);
    const updated = await eventService.getEvents();
    setEvents(updated);
  };

  return (
    <div>
      <div className="student-page-header">
        <div className="student-page-title">
          <h1>Campus Events</h1>
          <p>Discover hackathons, workshops, cultural fests, and sports tournaments</p>
        </div>
      </div>

      <div className="grid-3">
        {events.map(ev => <EventCard key={ev.id} event={ev} onRegister={handleRegister} />)}
      </div>
    </div>
  );
};
