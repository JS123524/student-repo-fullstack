import { useEffect, useState } from 'react';
import getData from '../api/rickAndMorty';

const Characters = function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async function loadCharacters() {
      try {
        const results = await getData('character', controller.signal, 5);

        if (!controller.signal.aborted) {
          setCharacters(results.slice(0, 100));
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

    loadCharacters();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p role="status">Loading characters...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  return (
    <section>
      <h2>Characters ({characters.length})</h2>

      {characters.length === 0 && <p>No characters found.</p>}

      <div className="character-grid">
        {characters.map((character) => {
          const { id, image, name, species, status } = character;
        
          return (
            <article className="character-card" key={id}>
              {image ? (
                <img
                  src={image}
                  alt={name?.trim() || 'Unknown character'}
                  loading="lazy"
                />
              ) : (
                <p>No image available</p>
              )}

              <h3>{name?.trim() || 'Unknown'}</h3>
              <p>Species: {species?.trim() || 'Unknown'}</p>
              <p>Status: {status?.trim() || 'Unknown'}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;