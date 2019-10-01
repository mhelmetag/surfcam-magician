import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SurfCam from "./SurfCam";
import StreamUrlFinder from "../lib/StreamUrlFinder";

import "./SurfCamContainer.css";

const SurfCamContainer = ({ spotId }) => {
  const [streamUrls, setStremUrls] = useState([]);

  async function updateStreamUrls(streamUrls) {
    setStremUrls(streamUrls);
  }

  useEffect(() => {
    async function fetchData() {
      const streamUrlFinder = new StreamUrlFinder();
      const spotOverviewUrl = streamUrlFinder.generateSpotOverviewUrl(spotId);
      const regionOverview = await streamUrlFinder.fetchRegionOverview(
        spotOverviewUrl
      );
      const spotInfo = streamUrlFinder.parseRegionOverview(
        regionOverview,
        spotId
      );
      const streamUrls = streamUrlFinder.parseStreamUrls(spotInfo);

      updateStreamUrls(streamUrls);
    }

    fetchData();
  });

  return (
    <div className="SurfCamContainer">
      {streamUrls.map((streamUrl, index) => {
        return <SurfCam key={index} streamUrl={streamUrl} />;
      })}
    </div>
  );
};

SurfCamContainer.propTypes = {
  spotId: PropTypes.string
};

export default SurfCamContainer;
