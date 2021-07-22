import React from "react";
import { useHistory } from "react-router-dom";

import useSearch from "../hooks/useSearch";

import "./Search.css";

const Spot = ({ spot }) => {
  let history = useHistory();

  if (spot.hasCameras) {
    return (
      <div
        className="clickable"
        onClick={() => history.push(`/spot/${spot.id}`)}
      >
        <i className="fa fa-camera" />
        {spot.name}
      </div>
    );
  } else {
    return (
      <div>
        {spot.name}
      </div>
    );
  }
};

const Search = () => {
  const { query, spots, setQuery } = useSearch();

  const updateQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <input className="input" type="text" placeholder="Ventura Point" value={query} onChange={updateQuery} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          height: "40vh",
          overflowX: "scroll",
        }}
      >
        {spots.map((spot) => {
          return (
            <Spot key={spot.id} spot={spot} />
          );
        })}
      </div>
    </>
  );
};

export default Search;