import { useEffect, useState } from 'react';
import getData from '../api/rickAndMorty';

const groupLocationsByType = function groupLocationsByType(locations) {
  const counts = new Map();

  locations.forEach((location) => {
    const type = location.type?.trim() || 'Unknown';
    const count = counts.get(type) ?? 0;

    counts.set(type, count + 1);
  });

  return Array.from(
    counts,
    ([type, count]) => ({ type, count }),
  ).sort((a, b) => a.type.localeCompare(b.type));
};

const Locations = function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadLocations = async function loadLocations() {
      try {
        const results = await getData('location', controller.signal);

        if (!controller.signal.aborted) {
          setLocations(results);
        }
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadLocations();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p role="status">Loading locations...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  const locationGroups = groupLocationsByType(locations);

  return (
    <section>
      <h2>Locations</h2>
      <p>Total locations: {locations.length}</p>

      {locationGroups.length === 0 && <p>No locations found.</p>}

      <div className="location-grid">
        {locationGroups.map(({ type, count }) => (
          <article className="location-card" key={type}>
            <h3>{type}</h3>
            <p>Count: {count}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Locations;
