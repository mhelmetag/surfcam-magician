export const EARTH_ID = "58f7ed51dadb30820bb38782";

class TaxonomyHelper {
  async fetchTaxonomyTree(id, maxDepth = 0) {
    const taxonomyUrl = this.generateTaxonomyUrl(id, maxDepth);

    return fetch(taxonomyUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw Error(
          `Unexpected response while fetching taxonomy tree! HTTP status was ${response.status}`
        );
      })
      .then((data) => data)
      .catch((error) => {
        throw Error(error.message);
      });
  }

  generateTaxonomyUrl(id, maxDepth = 0) {
    const baseUrl = "https://services.surfline.com/taxonomy";
    let searchParams = new URLSearchParams("");

    searchParams.append("type", "taxonomy");
    searchParams.append("id", id);
    searchParams.append("maxDepth", maxDepth);

    return `${baseUrl}?${searchParams.toString()}`;
  }
}

export default TaxonomyHelper;
