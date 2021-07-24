import React from "react";

import Favorites from "./Favorites";
import Search from "./Search";

const Layout = ({ children }) => {
  return (
    <>
      <section
        className="section"
        style={{
          background: "linear-gradient(to bottom right, blue, green",
        }}
      >
        <div className="container">
          <h1 className="title has-text-white">Surfcam Magician</h1>
          <h2 className="subtitle has-text-light">When you're itching for the waves, the only lotion is the ocean</h2>
        </div>
      </section>
      <section className="section">
        <div className="container is-fluid">
          <Favorites />
        </div>
      </section>
      <section className="section">
        <div className="container is-fluid">
          {children}
        </div>
      </section>
      <section className="section">
        <div className="container is-fluid">
          <Search />
        </div>
      </section>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Built by Maxworld Technologies</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;