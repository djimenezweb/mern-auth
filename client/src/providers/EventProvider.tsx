import { Event } from '@/types';
import { EventContext } from './EventContext';
import { useCallback, useMemo, useState } from 'react';

export default function EventProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, setEvents] = useState<Event[]>([]);

  function getCurrentTime() {
    return new Date().getTime();
  }

  const addEvent = useCallback(
    (message: string, time: number = getCurrentTime()) => {
      if (!message) return;

      const timeStamp = new Date(time).toLocaleTimeString(undefined, {
        timeStyle: 'medium',
        hourCycle: 'h24',
      });

      setEvents(prev => [...prev, { time: timeStamp, message }]);
    },
    []
  );

  const value = useMemo(() => {
    return { events, addEvent };
  }, [events, addEvent]);

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
