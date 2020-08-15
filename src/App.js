import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SurfCamContainer from "./components/SurfCamContainer";
import Breadcrumb from "./components/Breadcrumb";
import { useFavorites } from "./hooks/useFavorites";

// Main Quote - When you're itching for the waves, the only lotion is the ocean.
// 404 - Just 'cause you're riding the high tide, doesn't mean you've chosen the right course.
// Error - Sometimes, the bird sings, sometimes it coughs up a worm.

const App = () => {
  const favorites = useFavorites();

  const favoritesLinks = Object.entries(favorites.favoritesMap).map(([spotId, spotTitle]) => (
    <span style={{ padding: '10px' }}>
      {'⭐️ '}
      <a key={spotId} href={`/spot/${spotId}`}>{spotTitle}</a>
    </span>
  ));

  return (
    <Router>
      <header
        className="section"
        style={{
          background: "linear-gradient(to bottom right, blue, green",
        }}
      >
        <div className="container">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <h1 className="title has-text-white">Surfcam Magician</h1>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <a
                  className="level-item"
                  href="https://github.com/mhelmetag/surfcam-magician"
                >
                  <span className="icon is-large">
                    <i className="fab fa-lg fa-github has-text-white" />
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                {favoritesLinks}
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="section">
        <div className="container is-fluid">
          <Switch>
            <Route path="/spot/:id">
              <SurfCamContainer favorites={favorites} />
            </Route>
            <Route path="/">
              <SurfCamContainer favorites={favorites} defaultSpotId="584204204e65fad6a77096b1" />
            </Route>
          </Switch>
        </div>
      </section>
      <section className="section">
        <div className="container is-fluid">
          <Breadcrumb />
        </div>
      </section>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Built by Maxworld Technologies</p>
        </div>
      </footer>
    </Router>
  );
};

export default App;
