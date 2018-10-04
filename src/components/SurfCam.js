import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class SurfCam extends Component {
  render() {
    return (
      <div className="SurfCam">
        <ReactPlayer
          url={this.props.streamUrl}
          playing={true}
          controls={true}
          muted={true}
          width={'100%'}
          height={'100%'}
        />
      </div>
    );
  }
}

export default SurfCam;
