import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import SurfCam from "./SurfCam";
import StreamUrlFinder from "../lib/StreamUrlFinder";

import "./SurfCamContainer.css";

function useStreamUrls(spotId) {
  const [streamUrls, setStremUrls] = useState([]);

  function updateStreamUrls(streamUrls) {
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
