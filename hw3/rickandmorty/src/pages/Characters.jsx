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
        {characters.map((character) => (
          <article className="character-card" key={character.id}>
            {character.image ? (
              <img
                src={character.image}
                alt={character.name?.trim() || 'Unknown character'}
                loading="lazy"
              />
            ) : (
              <p>No image available</p>
            )}

            <h3>{character.name?.trim() || 'Unknown'}</h3>
            <p>Species: {character.species?.trim() || 'Unknown'}</p>
            <p>Status: {character.status?.trim() || 'Unknown'}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Characters;