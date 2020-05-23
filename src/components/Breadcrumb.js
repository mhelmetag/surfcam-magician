import React from "react";
import { useHistory } from "react-router-dom";

import { useSpots } from "../hooks/useSpots";
import { EARTH_ID } from "../lib/TaxonomyHelper";

const sortByName = (items) => {
  const sortedNames = items
    .map((item) => item.name)
    .sort((a, b) => a.localeCompare(b));

  return sortedNames.reduce((sortedItems, sortedName) => {
    const item = items.find((item) => item.name === sortedName);
    return sortedItems.concat(item);
  }, []);
};

const Breadcrumb = () => {
  let history = useHistory();
  const { getSpot, spots, activeId, index } = useSpots();

  React.useEffect(() => {
    getSpot(EARTH_ID);
  }, [getSpot]);

  const SubregionList = ({ taxonomy }) => {
    const subregions = taxonomy.contains.filter((t) => t.type === "geoname");
    const spots = taxonomy.contains.filter((t) => t.type === "spot");

    const reducer = (groups, spot) => {
      const subregionID = spot.liesIn[0];

      (groups[subregionID] = groups[subregionID] || []).push(spot);

      return groups;
    };
    const groupedSpots = spots.reduce(reducer, {});
    const validSubregions = subregions.filter(
      (subregion) =>
        groupedSpots[subregion._id] && groupedSpots[subregion._id].length > 0
    );

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          height: "40vh",
          overflowX: "scroll",
        }}
      >
        {sortByName(validSubregions).map((subregion, index) => {
          return (
            <div key={subregion._id} style={{ paddingTop: "3vh" }}>
              <p style={{ fontWeight: "bold" }}>{subregion.name}</p>
              <div>
                {sortByName(groupedSpots[subregion._id]).map((spot) => {
                  return (
                    <p
                      key={spot._id}
                      onClick={() => {
                        if (spot.cameras.length > 0) {
                          history.push(`/spot/${spot.spot}`);
                        }
                      }}
                    >
                      {spot.name}
                      {spot.cameras.length > 0 && (
                        <span className="icon has-text-info">
                          <i className="fas fa-sm fa-video"></i>
                        </span>
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const TaxonomyList = ({ taxonomy }) => {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          height: "40vh",
          overflowX: "scroll",
        }}
      >
        {sortByName(taxonomy.contains).map((taxonomy) => {
          return (
            <div
              key={taxonomy._id}
              onClick={() => {
                getSpot(taxonomy._id);
              }}
            >
              {taxonomy.name}
            </div>
          );
        })}
      </div>
    );
  };

  const Crumb = ({ taxonomy }) => {
    const path = taxonomy.enumeratedPath.split(",") || [];

    return (
      <nav className="breadcrumb">
        <ul>
          <li>
            <p style={{ paddingRight: "0.75em" }}>Earth</p>
          </li>
          <li>
            <p style={{ paddingLeft: "0.75em", paddingRight: "0.75em" }}>
              {path[2] || "Continent"}
            </p>
          </li>
          <li>
            <p style={{ paddingLeft: "0.75em", paddingRight: "0.75em" }}>
              {path[3] || "Country"}
            </p>
          </li>
          <li>
            <p style={{ paddingLeft: "0.75em", paddingRight: "0.75em" }}>
              {path[4] || "Region"}
            </p>
          </li>
          <li>
            <p style={{ paddingLeft: "0.75em" }}>{path[5] || "Area"}</p>
          </li>
        </ul>
      </nav>
    );
  };

  const List = ({ taxonomy }) => {
    if (index === 5) {
      return <SubregionList taxonomy={taxonomy} />;
    } else {
      return <TaxonomyList taxonomy={taxonomy} />;
    }
  };

  const Complete = ({ taxonomy }) => {
    if (taxonomy) {
      return (
        <div>
          <Crumb taxonomy={spots[activeId]} />
          <List taxonomy={spots[activeId]} />
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return <Complete taxonomy={spots[activeId]} />;
};

export default Breadcrumb;
