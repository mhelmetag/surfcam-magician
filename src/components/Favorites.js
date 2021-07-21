import React from "react";

import useFavorites from "../hooks/useFavorites";

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites && Object.keys(favorites).length > 0) {
    return Object.entries(favorites).map(([spotId, spotTitle]) => (
      <span key={spotId} style={{ padding: '10px' }}>
        {'⭐️ '}
        <a href={`/spot/${spotId}`}>{spotTitle}</a>
      </span>
    ));
  } else {
    return (
      <p>Add some favorites!</p>
    );
  }
};

export default Favorites;