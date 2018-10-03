import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleStreamUrlUpdate = this.handleStreamUrlUpdate.bind(this);
  }

  componentWillMount() {
    this.setState({streamUrl: "https://cams.cdn-surfline.com/abr-3/ngrp:sandspitcam_all/playlist.m3u8"})
  }

  handleStreamUrlUpdate(e) {
    e.preventDefault();

    if (e.key === 'Enter') {
      this.setState({streamUrl: e.currentTarget.value});
    }
  }

  render() {
    return (
      <div className="App">
        <p>Surfcam Magician</p>
        <div className="SurfCam">
          <ReactPlayer
            url={this.state.streamUrl}
            playing={true}
            controls={true}
          />
        </div>
        <div className="StreamUrlInput">
          <input
            type="text"
            placeholder={this.state.streamUrl}
            onKeyPress={this.handleStreamUrlUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;
