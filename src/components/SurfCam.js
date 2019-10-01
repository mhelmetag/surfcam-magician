import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

import "./SurfCam.css";

const SurfCam = ({ streamUrl }) => {
  return (
    <div className="SurfCam">
      <ReactPlayer
        url={streamUrl}
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
  streamUrl: PropTypes.string.isRequired
};

export default SurfCam;
