import { useEffect, useState } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { WORKOUTS_URL } from '../constants';

const Home = () => {
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(WORKOUTS_URL);
      const json = await response.json();

      if (response.ok) {
        setWorkouts(json);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">{workouts && workouts.map(item => <WorkoutDetails key={item._id} workout={item} />)}</div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
