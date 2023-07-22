import { useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { WORKOUTS_URL } from '../constants';

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const INITIAL_FORM = { title: '', load: '', repetitions: '' };
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const response = await fetch(WORKOUTS_URL, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` }
    });
    const json = await response.json();
    // AQUÍ HAY ALGO QUE DA FALLOS
    if (!response.ok) {
      console.log('response not OK');
      // setError(json.error);
      // setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      console.log('new workout added', json);
      setFormData(INITIAL_FORM);
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise</label>
      <input
        type="text"
        className={emptyFields.includes('title') ? 'error' : ''}
        onChange={e => setFormData({ ...formData, title: e.target.value })}
        value={formData.title}
      />
      <label>Load (kg)</label>
      <input
        type="number"
        className={emptyFields.includes('load') ? 'error' : ''}
        onChange={e => setFormData({ ...formData, load: e.target.value })}
        value={formData.load}
      />
      <label>Repetitions</label>
      <input
        type="number"
        className={emptyFields.includes('repetitions') ? 'error' : ''}
        onChange={e => setFormData({ ...formData, repetitions: e.target.value })}
        value={formData.repetitions}
      />
      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
