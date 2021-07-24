import { useState, useEffect } from "react";

import RegionOverviewHelper from "../lib/RegionOverviewHelper";

export default function useStreamUrls(spotId) {
  const [streamUrls, setStreamUrls] = useState([]);
  const [spotName, setSpotName] = useState(null);

  async function fetchAndSet(spotId) {
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
    setStreamUrls(streamUrls);
  }

  useEffect(() => {
    fetchAndSet(spotId);
  }, [spotId]);

  return { streamUrls, spotName };
}