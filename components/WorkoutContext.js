import { createContext, useState } from 'react';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([
    { sport: 'Run', distance: 5, duration: 30, date: new Date().toDateString() },
    { sport: 'Swimming', distance: 10, duration: 45, date: new Date().toDateString() },
  ]);
  const [unit, setUnit] = useState('km'); // Default unit is kilometers

  const convertDistance = (distance, toUnit) => {
    if (toUnit === 'miles') {
      return distance * 0.621371; // KM to Miles
    } else {
      return distance / 0.621371; // Miles to KM
    }
  };

  return (
    <WorkoutContext.Provider value={{ workouts, setWorkouts, unit, setUnit, convertDistance }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContext;
