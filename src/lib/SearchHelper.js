export default class SearchHelper {
  generateSearchUrl(query) {
    return `https://services.surfline.com/search/site?q=${query}&querySize=20&suggestionSize=1&newsSearch=false`;
  }

  async fetchSearchResults(searchUrl) {
    const localsearchUrl = searchUrl.replace(
      "https://services.surfline.com",
      ""
    );

    return fetch(localsearchUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw Error(
          `Unexpected response while fetching region overview! HTTP status was ${response.status}`
        );
      })
      .then((data) => data)
      .catch((error) => {
        throw Error(error.message);
      });
  }

  filterSearchResultsForSpots(searchResults) {
    // The first object returned by the search service is the spots
    return searchResults[0]?.hits?.hits || [];
  }

  processSpotSearchResults(spotSearchResults) {
    return spotSearchResults.map((spotSearchResult) => {
      return {
        id: spotSearchResult._id,
        name: spotSearchResult._source.name,
        hasCameras: spotSearchResult._source.cams.length > 0,
      };
    });
  }
}
