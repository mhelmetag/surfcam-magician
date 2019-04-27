import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

import StreamUrlFinder from "../lib/StreamUrlFinder";

import "./SurfCam.css";

const SurfCam = ( props ) => {

  const spotId = props.spotId || props.match.id;

  async function getStreamUrl() {
    const streamUrlFinder = new StreamUrlFinder();
    await streamUrlFinder.fetchStreamUrl(spotId);
  }
  

  debugger;

  return ( 
    <div className="SurfCam">
      <ReactPlayer
        url={getStreamUrl()} 
        playing={true}
        controls={true}
        muted={true}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

SurfCam.propTypes = {
  streamUrl: PropTypes.string
};

export default SurfCam;
