import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import SurfCamContainer from "./components/SurfCamContainer";

import useFavorites from "./hooks/useFavorites";

// 404 - Just 'cause you're riding the high tide, doesn't mean you've chosen the right course.
// Error - Sometimes, the bird sings, sometimes it coughs up a worm.

const DEFAULT_SPOT_ID = "584204204e65fad6a77096b1";

const App = () => {
  const { favorites } = useFavorites();

  const defaultSpotId = (() => {
    if (favorites && Object.keys(favorites).length > 0) {
      return Object.keys(favorites)[0];
    } else {
      return DEFAULT_SPOT_ID;
    }
  })();

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/spot/:id">
            <SurfCamContainer />
          </Route>
          <Route path="/">
            <SurfCamContainer defaultSpotId={defaultSpotId} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
