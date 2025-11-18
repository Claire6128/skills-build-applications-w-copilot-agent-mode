import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespace = window.location.hostname.split('-3000')[0];
  const endpoint = `https://${codespace}-8000.app.github.dev/api/leaderboard/`;

  const fetchLeaders = () => {
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        console.log('Réponse API leaderboard:', data);
        setLeaders(Array.isArray(data) ? data : (data.results || []));
        setLoading(false);
      })
      .catch(err => {
        setError('Impossible de charger le leaderboard.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeaders();
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      {loading && <div className="alert alert-info">Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.team || ''}</td>
                <td>{entry.points || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-primary mt-3" onClick={fetchLeaders}>Rafraîchir</button>
    </div>
  );
};



export default Leaderboard;
