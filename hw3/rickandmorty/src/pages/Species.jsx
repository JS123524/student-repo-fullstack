import { useEffect, useState } from 'react';
import getData from '../api/rickAndMorty';

const groupCharactersBySpecies = function groupCharactersBySpecies(characters) {
  const groups = new Map();

  characters.forEach((character) => {
    const species = character.species?.trim() || 'Unknown';
    const members = groups.get(species) ?? [];

    members.push(character);
    groups.set(species, members);
  });

  return Array.from(
    groups,
    ([species, members]) => ({ species, members }),
  ).sort((a, b) => a.species.localeCompare(b.species));
};

const Species = function Species() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async function loadCharacters() {
      try {
        const results = await getData('character', controller.signal);

        if (!controller.signal.aborted) {
          setCharacters(results);
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
    return <p role="status">Loading species...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  const speciesGroups = groupCharactersBySpecies(characters);

  return (
    <section>
      <h2>Species ({speciesGroups.length})</h2>
      <p>Total characters: {characters.length}</p>

      {speciesGroups.length === 0 && <p>No species found.</p>}

      <div className="species-grid">
        {speciesGroups.map(({ species, members }) => (
          <article className="species-group" key={species}>
            <h3>
              {species} ({members.length})
            </h3>

            <ul>
              {members.map((character) => (
                <li key={character.id}>
                  {character.name?.trim() || 'Unknown'}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Species;
