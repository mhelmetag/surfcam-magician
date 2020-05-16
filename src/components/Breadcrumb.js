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
      <div>
        {sortByName(validSubregions).map((subregion) => {
          return (
            <div>
              <div key={subregion._id} style={{ fontWeight: "bold" }}>
                {subregion.name}
              </div>
              {sortByName(groupedSpots[subregion._id]).map((spot) => {
                return (
                  <div
                    key={spot._id}
                    onClick={() => {
                      if (spot.cameras.length > 0) {
                        history.push(`/spot/${spot.spot}`);
                      }
                    }}
                  >
                    {spot.name}
                    {spot.cameras.length <= 0 && " - No cameras :( ..."}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const TaxonomyList = ({ taxonomy }) => {
    return (
      <div>
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

  const List = ({ taxonomy }) => {
    if (index === 5) {
      return <SubregionList taxonomy={taxonomy} />;
    } else {
      return <TaxonomyList taxonomy={taxonomy} />;
    }
  };

  return <div>{spots[activeId] && <List taxonomy={spots[activeId]} />}</div>;
};

export default Breadcrumb;
