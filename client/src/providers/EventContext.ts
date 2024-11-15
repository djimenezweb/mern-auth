import { Event } from '@/types';
import { createContext } from 'react';

type Context = {
  events: Event[];
  addEvent: (newEvent: Event) => void;
};

export const EventContext = createContext<Context | null>(null);
