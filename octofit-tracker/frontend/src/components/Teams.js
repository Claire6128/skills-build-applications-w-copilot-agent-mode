import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespace = window.location.hostname.split('-3000')[0];
  const endpoint = `https://${codespace}-8000.app.github.dev/api/teams/`;

  const fetchTeams = () => {
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        setTeams(Array.isArray(data) ? data : (data.results || []));
        setLoading(false);
      })
      .catch(err => {
        setError('Impossible de charger les équipes.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      {loading && <div className="alert alert-info">Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => {
              let members = team.members;
              if (typeof members === 'string') {
                try {
                  members = JSON.parse(members.replace(/'/g, '"'));
                } catch (e) {
                  members = [team.members];
                }
              }
              return (
                <tr key={idx}>
                  <td>{team.name}</td>
                  <td>{Array.isArray(members) ? members.join(', ') : members}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button className="btn btn-primary mt-3" onClick={fetchTeams}>Rafraîchir</button>
    </div>
  );
};

export default Teams;
