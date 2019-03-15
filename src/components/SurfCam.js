import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

import "./SurfCam.css";

class SurfCam extends Component {
  render() {
    return (
      <div className="SurfCam">
        <ReactPlayer
          url={this.props.streamUrl}
          playing={true}
          controls={true}
          muted={true}
          width={"100%"}
          height={"100%"}
        />
      </div>
    );
  }
}

SurfCam.propTypes = {
  streamUrl: PropTypes.string
};

export default SurfCam;
