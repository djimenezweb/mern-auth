import { WORKOUTS_URL } from '../constants';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
// date-fns library
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${WORKOUTS_URL}${workout._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong> {workout.load}
      </p>
      <p>
        <strong>Repetitions: </strong> {workout.repetitions}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick} className="material-symbols-outlined">
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
