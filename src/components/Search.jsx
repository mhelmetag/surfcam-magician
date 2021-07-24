import React from "react";
import { Link } from "react-router-dom";

import useSearch from "../hooks/useSearch";

import "./Search.css";

const SpotLink = ({ spot }) => {
  if (spot.hasCameras) {
    return (
      <Link className="link clickable" to={`/spot/${spot.id}`}><i className="fa fa-camera" /> {spot.name}</Link>
    );
  } else {
    return (
      <span>{spot.name}</span>
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
      <div className="control is-large">
        <input className="input is-large" type="text" placeholder="Ventura Point" value={query} onChange={updateQuery} />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          height: "40vh",
          overflowX: "scroll",
          marginTop: "3vh"
        }}
      >
        {spots.map((spot) => {
          return (
            <SpotLink key={spot.id} spot={spot} />
          );
        })}
      </div>
    </>
  );
};

export default Search;