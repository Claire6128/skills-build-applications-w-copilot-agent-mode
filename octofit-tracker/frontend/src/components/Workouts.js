import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespace = window.location.hostname.split('-3000')[0];
  const endpoint = `https://${codespace}-8000.app.github.dev/api/workouts/`;

  const fetchWorkouts = () => {
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        setWorkouts(Array.isArray(data) ? data : (data.results || []));
        setLoading(false);
      })
      .catch(err => {
        setError('Impossible de charger les entraînements.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWorkouts();
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      {loading && <div className="alert alert-info">Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Workout</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, idx) => (
              <tr key={idx}>
                <td>{workout.user || ''}</td>
                <td>{workout.workout || ''}</td>
                <td>{workout.reps || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-primary mt-3" onClick={fetchWorkouts}>Rafraîchir</button>
    </div>
  );
};

export default Workouts;
