const API_BASE_URL = 'https://rickandmortyapi.com/api';

const fetchPage = async function fetchPage(resource, page, signal) {
  const response = await fetch(`${API_BASE_URL}/${resource}?page=${page}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${resource} page ${page}: ${response.status}`,
    );
  }

  const data = await response.json();

  if (!Array.isArray(data?.results)) {
    throw new Error(`Invalid ${resource} data.`);
  }

  return data;
};

const getData = async function getData(resource, signal, maxPages) {
  const firstPage = await fetchPage(resource, 1, signal);
  const totalPages = firstPage.info?.pages;

  if (!Number.isInteger(totalPages) || totalPages < 1) {
    throw new Error(`Invalid ${resource} pagination data.`);
  }

  const lastPage = Math.min(totalPages, maxPages ?? totalPages);

  const remainingPages = Array.from(
    { length: lastPage - 1 },
    (_, index) => index + 2,
  );

  return remainingPages.reduce(async (previous, page) => {
    const results = await previous;
    const data = await fetchPage(resource, page, signal);

    return results.concat(data.results);
  }, Promise.resolve(firstPage.results));
};

export default getData;
