import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import SurfCam from "./SurfCam";
import RegionOverviewHelper from "../lib/RegionOverviewHelper";

function useStreamUrls(spotId) {
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

const SurfCamContainer = ({ defaultSpotId }) => {
  const { id } = useParams();
  const spotId = defaultSpotId ? defaultSpotId : id;
  const { streamUrls, spotName } = useStreamUrls(spotId);

  if (spotName) {
    document.title = `Surfcam Magician - ${spotName}`;
  }

  return (
    <div className="columns">
      {streamUrls.map((streamUrl, index) => {
        return <SurfCam key={index} streamUrl={streamUrl} />;
      })}
    </div>
  );
};

SurfCamContainer.propTypes = {
  defaultSpotId: PropTypes.string,
};

export default SurfCamContainer;
