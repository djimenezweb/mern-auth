import { Event } from '@/types';
import { EventContext } from './EventContext';
import { useCallback, useMemo, useState } from 'react';

export default function EventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = useCallback((message: string) => {
    const time = new Date().toLocaleTimeString(undefined, {
      timeStyle: 'medium',
      hourCycle: 'h24',
    });
    setEvents(prev => [...prev, { time, message }]);
  }, []);

  const value = useMemo(() => {
    return { events, addEvent };
  }, [events, addEvent]);

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
