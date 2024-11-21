import { EventContext } from '@/providers/EventContext';
import { useContext } from 'react';

export default function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within a Provider');
  }
  return context;
}
