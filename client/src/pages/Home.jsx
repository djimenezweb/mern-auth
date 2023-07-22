import { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { WORKOUTS_URL } from '../constants';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(WORKOUTS_URL, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">{workouts && workouts.map(item => <WorkoutDetails key={item._id} workout={item} />)}</div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
