import { Event } from '@/types';
import { EventContext } from './EventContext';
import { useState } from 'react';

export default function EventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<Event[]>([]);

  function addEvent(message: string) {
    const time = new Date().toLocaleTimeString(undefined, {
      timeStyle: 'medium',
      hourCycle: 'h24',
    });
    setEvents(prev => [...prev, { time, message }]);
  }

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}
