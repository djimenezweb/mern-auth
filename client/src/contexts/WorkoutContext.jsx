import { createContext, useReducer } from 'react';
import { workoutsReducer } from '../reducers/workoutsReducer';

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });
  return <WorkoutContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutContext.Provider>;
};
