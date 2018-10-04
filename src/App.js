import React, { Component } from 'react';
import SurfCam from './components/SurfCam';
import StreamUrlInput from './components/StreamUrlInput';
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
        <SurfCam
          streamUrl={this.state.streamUrl}
          playing={true}
          controls={true}
        />
        <StreamUrlInput
          streamUrl={this.state.streamUrl}
          onKeyPressFunction={this.handleStreamUrlUpdate}
        />
      </div>
    );
  }
}

export default App;
