
const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const codespace = window.location.hostname.split('-3000')[0];
  const endpoint = `https://${codespace}-8000.app.github.dev/api/activities/`;

  const fetchActivities = () => {
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then(data => {
        setActivities(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        setError('Impossible de charger les activités.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, [endpoint]);

  return (
    <div>
      <h2 className="mb-4">Activities</h2>
      {loading && <div className="alert alert-info">Chargement...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Distance (km)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={idx}>
                <td>{activity.user}</td>
                <td>{activity.type}</td>
                <td>{activity.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-primary mt-3" onClick={fetchActivities}>Rafraîchir</button>
    </div>
  );
};

export default Activities;
