import React, { Component } from "react";

import SurfCam from "./components/SurfCam";
import SpotUrlInput from "./components/SpotUrlInput";
import StreamUrlFinder from "./lib/StreamUrlFinder";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      spotUrl:
        "https://www.surfline.com/surf-report/ventura-point/584204204e65fad6a77096b1",
      streamUrl:
        "https://cams.cdn-surfline.com/cdn-wc/wc-venturapoint/playlist.m3u8",
      error: undefined
    };
    this.handleSpotUrlUpdate = this.handleSpotUrlUpdate.bind(this);
    this.errorComponent = this.errorComponent.bind(this);
  }

  async handleSpotUrlUpdate(e) {
    if (e.key === "Enter") {
      const spotUrl = e.currentTarget.value;

      if (spotUrl !== "") {
        try {
          const streamUrlFinder = new StreamUrlFinder(spotUrl);
          const streamUrl = await streamUrlFinder.fetchStreamUrl();

          this.setState({
            spotUrl: spotUrl,
            streamUrl: streamUrl,
            error: undefined
          });
        } catch (error) {
          this.setState({
            error: `Error: ${error.message}`
          });
        }
      }
    }
  }

  errorComponent() {
    return <p>{this.state.error}</p>;
  }

  render() {
    return (
      <div className="App">
        <p>Surfcam Magician</p>
        <SurfCam streamUrl={this.state.streamUrl} />
        {this.state.error && this.errorComponent()}
        <SpotUrlInput
          spotUrl={this.state.spotUrl}
          spotUrlUpdateFunction={this.handleSpotUrlUpdate}
        />
      </div>
    );
  }
}

export default App;
