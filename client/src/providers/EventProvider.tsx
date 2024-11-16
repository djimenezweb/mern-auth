import { Event } from '@/types';
import { EventContext } from './EventContext';
import { useState } from 'react';

export default function EventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(newEvent: Event) {
    setEvents(prev => [...prev, newEvent]);
  }

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}
