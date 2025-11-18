import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespace = window.location.hostname.split('-3000')[0];
  const endpoint = `https://${codespace}-8000.app.github.dev/api/users/`;

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        setUsers(Array.isArray(data) ? data : (data.results || []));
        setLoading(false);
      })
      .catch(err => {
        setError('Impossible de charger les utilisateurs.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4">Users</h2>
      {loading && <div className="alert alert-info">Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.name || ''}</td>
                <td>{user.email || ''}</td>
                <td>{user.team || ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-primary mt-3" onClick={fetchUsers}>Rafraîchir</button>
    </div>
  );
};

export default Users;
