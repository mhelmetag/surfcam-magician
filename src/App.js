import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import SurfCamContainer from "./components/SurfCamContainer";

// Main Quote - When you're itching for the waves, the only lotion is the ocean.
// 404 - Just 'cause you're riding the high tide, doesn't mean you've chosen the right course.
// Error - Sometimes, the bird sings, sometimes it coughs up a worm.

const App = () => {
  return (
    <Router>
      <div className="App">
        <p>Surfcam Magician</p>
        <Switch>
          <Route path="/spot/:id">
            <SurfCamContainer />
          </Route>
          <Route path="/">
            <SurfCamContainer defaultSpotId="584204204e65fad6a77096b1" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
