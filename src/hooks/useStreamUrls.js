import { useState, useEffect } from "react";

import RegionOverviewHelper from "../lib/RegionOverviewHelper";

export default function useStreamUrls(spotId) {
  const [streamUrls, setStremUrls] = useState([]);
  const [spotName, setSpotName] = useState(null);

  function updateStreamUrls(streamUrls) {
    setStremUrls(streamUrls);
  }

  useEffect(() => {
    async function fetchData() {
      const regionOverviewHelper = new RegionOverviewHelper();
      const spotOverviewUrl = regionOverviewHelper.generateSpotOverviewUrl(
        spotId
      );
      const regionOverview = await regionOverviewHelper.fetchRegionOverview(
        spotOverviewUrl
      );
      const spotInfo = regionOverviewHelper.findSpot(regionOverview, spotId);
      const streamUrls = regionOverviewHelper.parseStreamUrls(spotInfo);

      setSpotName(spotInfo.name);
      updateStreamUrls(streamUrls);
    }

    fetchData();
  }, [spotId]);

  return { streamUrls, spotName };
}