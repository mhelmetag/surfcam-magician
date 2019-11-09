const EARTH_ID = "58f7ed51dadb30820bb38782";

class TaxonomyHelper {
  async fetchContinents() {
    return this.fetchTaxonomyTree(EARTH_ID);
  }

  async fetchTaxonomyTree(id) {
    const taxonomyUrl = this.generateTaxonomyUrl(id);

    return fetch(taxonomyUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw Error(
          `Unexpected response while fetching taxonomy tree! HTTP status was ${response.status}`
        );
      })
      .then(data => data)
      .catch(error => {
        throw Error(error.message);
      });
  }

  generateTaxonomyUrl(id) {
    const baseUrl = "https://services.surfline.com/taxonomy";
    let searchParams = new URLSearchParams("");

    searchParams.append("type", "taxonomy");
    searchParams.append("id", id);
    searchParams.append("maxDepth", 0);

    return `${baseUrl}?${searchParams.toString()}`;
  }

  processTaxonomyTree(tree) {
    const locations = tree.contains || [];

    return locations.map(location => {
      return {
        name: location.name,
        id: location._id
      };
    });
  }

  processTaxonomyTreeForArea(tree) {
    const locations = tree.contains || [];
    const subregions = locations.filter(
      location => location.type === "subregion"
    );

    return subregions.map(subregion => {
      return {
        name: subregion.name,
        id: subregion.subregion
      };
    });
  }
}

export default TaxonomyHelper;
