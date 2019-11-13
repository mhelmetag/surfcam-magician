import { useState, useEffect } from "react";

import TaxonomyHelper from "../lib/TaxonomyHelper";
import RegionOverviewHelper from "../lib/RegionOverviewHelper";

// At area level (searching for spots), it'd probably be best to go for the region overview
// since that has camera info (to filter out spot with no cams)

// For areas, need to pull "subregion" key and then use for region overview with subregionId in query string
// https://services.surfline.com/kbyg/regions/overview?subregionId=58581a836630e24c4487900c
// Then data.spots is spots
// Only use spots with spot.camera.length greater or equal to 1

function useLocation() {
  const [location, setLocation] = useState({
    continents: [],
    countries: [],
    regions: [],
    areas: [],
    spots: []
  });
  const [selected, setSelected] = useState({
    continent: null,
    country: null,
    region: null,
    area: null,
    spot: null
  });

  useEffect(() => {
    const taxonomyHelper = new TaxonomyHelper();
    const regionOverviewHelper = new RegionOverviewHelper();

    async function fetchContenents() {
      const tree = await taxonomyHelper.fetchContinents();
      const continents = taxonomyHelper.processTaxonomyTree(tree);

      updateContinents(continents);
    }

    function updateContinents(continents) {
      setLocation({ ...location, continents: continents });
    }

    async function fetchCountries() {
      const tree = await taxonomyHelper.fetchTaxonomyTree(selected.continent);
      const countries = taxonomyHelper.processTaxonomyTree(tree);

      updateCountries(countries);
    }

    function updateCountries(countries) {
      setLocation({ ...location, countries: countries });
    }

    async function fetchRegions() {
      const tree = await taxonomyHelper.fetchTaxonomyTree(selected.country);
      const regions = taxonomyHelper.processTaxonomyTree(tree);

      updateRegions(regions);
    }

    function updateRegions(regions) {
      setLocation({ ...location, regions: regions });
    }

    async function fetchAreas() {
      const tree = await taxonomyHelper.fetchTaxonomyTree(selected.region);
      const areas = taxonomyHelper.processTaxonomyTreeForArea(tree);

      updateAreas(areas);
    }

    function updateAreas(areas) {
      setLocation({ ...location, areas: areas });
    }

    async function fetchSpots() {
      const regionOverviewUrl = regionOverviewHelper.generateRegionOverviewUrl(
        selected.area
      );
      const regionOverview = await regionOverviewHelper.fetchRegionOverview(
        regionOverviewUrl
      );
      const spots = regionOverviewHelper.processRegionOverview(regionOverview);

      updateSpots(spots);
    }

    function updateSpots(spots) {
      setLocation({ ...location, spots: spots });
    }

    if (location.continents.length === 0) {
      fetchContenents();
    }

    if (selected.continent && location.countries.length === 0) {
      fetchCountries();
    }

    if (selected.country && location.regions.length === 0) {
      fetchRegions();
    }

    if (selected.region && location.areas.length === 0) {
      fetchAreas();
    }

    if (selected.area && location.spots.length === 0) {
      fetchSpots();
    }
  }, [location, selected]);

  return [location, selected, setSelected, setLocation];
}

export default useLocation;
