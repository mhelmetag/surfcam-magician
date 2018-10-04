import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class SurfCam extends Component {
  render() {
    return (
      <div className="SurfCam">
        <ReactPlayer
          url={this.props.streamUrl}
          playing={this.props.playing}
          controls={this.props.controls}
        />
      </div>
    );
  }
}

export default SurfCam;
