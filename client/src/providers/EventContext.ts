import { Event } from '@/types';
import { createContext } from 'react';

type Context = {
  events: Event[];
  addEvent: (message: string, time?: number) => void;
};

export const EventContext = createContext<Context | null>(null);
