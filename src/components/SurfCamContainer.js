import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import SurfCam from "./SurfCam";
import RegionOverviewHelper from "../lib/RegionOverviewHelper";

import "./SurfCamContainer.css";

function useStreamUrls(spotId) {
  const [streamUrls, setStremUrls] = useState([]);

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

      updateStreamUrls(streamUrls);
    }

    fetchData();
  }, [spotId]);

  return streamUrls;
}

const SurfCamContainer = ({ defaultSpotId }) => {
  const { id } = useParams();
  const spotId = defaultSpotId ? defaultSpotId : id;
  const streamUrls = useStreamUrls(spotId);

  return (
    <div className="SurfCamContainer">
      {streamUrls.map((streamUrl, index) => {
        return <SurfCam key={index} streamUrl={streamUrl} />;
      })}
    </div>
  );
};

SurfCamContainer.propTypes = {
  defaultSpotId: PropTypes.string
};

export default SurfCamContainer;
