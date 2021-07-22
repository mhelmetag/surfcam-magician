import { useState, useEffect } from "react";

import SearchHelper from "../lib/SearchHelper";

export default function useStreamUrls(spotId) {
  const [query, setQuery] = useState('');
  const [spots, setSpots] = useState([]);

  async function fetchAndSet(query) {
    const searchHelper = new SearchHelper();
    const searchUrl = searchHelper.generateSearchUrl(query);
    const searchResults = await searchHelper.fetchSearchResults(searchUrl);
    const spotSearchResults = searchHelper.filterSearchResultsForSpots(searchResults);
    const spots = searchHelper.processSpotSearchResults(spotSearchResults);

    setSpots(spots);
  }

  useEffect(() => {
    if (query !== '') {
      fetchAndSet(query);
    } else {
      setSpots([]);
    }
  }, [query]);

  return { setQuery, query, spots };
}