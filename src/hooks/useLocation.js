import { useState, useEffect } from "react";

import TaxonomyHelper from "../lib/TaxonomyHelper";
import RegionOverviewHelper from "../lib/RegionOverviewHelper";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const taxonomyHelper = new TaxonomyHelper();
    const regionOverviewHelper = new RegionOverviewHelper();

    async function fetchContenents() {
      const tree = await taxonomyHelper.fetchContinents();
      const continents = taxonomyHelper.processTaxonomyTree(tree);

      setLoading(false);
      updateContinents(continents);
    }

    function updateContinents(continents) {
      setLocation({ ...location, continents: continents });
    }

    async function fetchCountries() {
      const tree = await taxonomyHelper.fetchTaxonomyTree(selected.continent);
      const countries = taxonomyHelper.processTaxonomyTree(tree);

      setLoading(false);
      updateCountries(countries);
    }

    function updateCountries(countries) {
      setLocation({ ...location, countries: countries });
    }

    async function fetchRegions() {
      const tree = await taxonomyHelper.fetchTaxonomyTree(selected.country);
      const regions = taxonomyHelper.processTaxonomyTree(tree);

      setLoading(false);
      updateRegions(regions);
    }

    function updateRegions(regions) {
      setLocation({ ...location, regions: regions });
    }

    async function fetchAreas() {
      const tree = await taxonomyHelper.fetchTaxonomyTree(selected.region);
      const areas = taxonomyHelper.processTaxonomyTreeForArea(tree);

      setLoading(false);
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

      setLoading(false);
      updateSpots(spots);
    }

    function updateSpots(spots) {
      setLocation({ ...location, spots: spots });
    }

    if (location.continents.length === 0) {
      fetchContenents();
    }

    if (selected.continent && location.countries.length === 0 && loading) {
      fetchCountries();
    }

    if (selected.country && location.regions.length === 0 && loading) {
      fetchRegions();
    }

    if (selected.region && location.areas.length === 0 && loading) {
      fetchAreas();
    }

    if (selected.area && location.spots.length === 0 && loading) {
      fetchSpots();
    }

    console.log(loading);
  }, [location, selected, loading]);

  return [location, selected, setSelected, setLocation, setLoading];
}

export default useLocation;
