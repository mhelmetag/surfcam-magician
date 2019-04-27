import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SurfCam from "./components/SurfCam";
import SpotUrlInput from "./components/SpotUrlInput";
import StreamUrlFinder from "./lib/StreamUrlFinder";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

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
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => <SurfCam {...props} streamUrl={this.state.streamUrl} />} />
            <Route path="/:id" component={SurfCam} />
          </Switch>
        </BrowserRouter>
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
