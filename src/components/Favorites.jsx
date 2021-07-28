import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./Favorites.css";

const Favorites = ({favorites}) => {
  if (favorites && Object.keys(favorites).length > 0) {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column"
        }}
      >
        {Object.entries(favorites).map(([spotId, spotTitle]) => {
          return (
            <Link key={spotId} className="favorite" to={`/spot/${spotId}`}><i className="fa fa-star" /> {spotTitle}</Link>
          );
        })}
      </div>
    );
  } else {
    return (
      <p>Add some favorites!</p>
    );
  }
};

Favorites.propTypes = {
  favorites: PropTypes.object.isRequired
};


export default Favorites;