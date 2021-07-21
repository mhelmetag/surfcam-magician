import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import useStreamUrls from "../hooks/useStreamUrls";
import useFavorites from "../hooks/useFavorites";

import SurfCam from "./SurfCam";

const SurfCamContainer = ({ defaultSpotId }) => {
  const { id } = useParams();
  const spotId = defaultSpotId ? defaultSpotId : id;

  const { streamUrls, spotName } = useStreamUrls(spotId);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const title = spotName || spotId;
  document.title = `Surfcam Magician - ${title}`;

  const isFavorite = !!favorites[spotId];

  const onFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(spotId);
    } else {
      addFavorite(spotId, title);
    }
  };

  return (
    <>
      <div className="level">
        <div className="level-left">
          <button className="button level-item" style={{ marginRight: '10px' }} onClick={onFavoriteClick}>
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <span className="level-item">{title}</span>
        </div>
      </div>
      <div className="columns">
        {streamUrls.map((streamUrl, index) => {
          return <SurfCam key={index} streamUrl={streamUrl} />;
        })}
      </div>
    </>
  );
};

SurfCamContainer.propTypes = {
  defaultSpotId: PropTypes.string
};

export default SurfCamContainer;
