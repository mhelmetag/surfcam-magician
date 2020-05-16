import React from "react";
import TaxonomyHelper from "../lib/TaxonomyHelper";

export const useSpots = () => {
  const [spots, setSpots] = React.useState({});
  const [activeId, setActiveId] = React.useState(null);
  const [index, setIndex] = React.useState(0);

  const getSpot = (id) => {
    return new Promise((resolve, reject) => {
      if (spots[id]) {
        resolve(spots[id]);
      } else {
        if (index === 3) {
          return new TaxonomyHelper()
            .fetchTaxonomyTree(id)
            .then((data) => ({
              ...data,
              contains: data.contains.filter(
                (taxonomy) => taxonomy.type === "subregion"
              ),
            }))
            .then((data) => {
              setSpots((state) => {
                return {
                  ...state,
                  [data._id]: data,
                };
              });
              setActiveId(id);
              setIndex((index) => index + 1);
            });
        } else if (index === 4) {
          return new TaxonomyHelper()
            .fetchTaxonomyTree(id, 1)
            .then((data) => ({
              ...data,
              contains: data.contains.filter(
                (taxonomy) => taxonomy.type === "spot"
              ),
            }))
            .then((data) => {
              const spotIds = data.contains.map((spot) => spot.spot);

              fetch("https://services.surfline.com/kbyg/spots/batch", {
                method: "POST",
                body: JSON.stringify({ spotIds: spotIds }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  return response.json();
                })
                .then((batchData) => batchData.data)
                .then((batchData) => {
                  setSpots((state) => {
                    const newContains = data.contains.map((spot) => {
                      const batchSpot = batchData.find(
                        (bD) => bD._id === spot.spot
                      );
                      const cameras = batchSpot ? batchSpot.cameras : [];
                      return {
                        ...spot,
                        cameras,
                      };
                    });
                    return {
                      ...state,
                      [data._id]: {
                        ...data,
                        contains: newContains,
                      },
                    };
                  });
                  setActiveId(id);
                  setIndex((index) => index + 1);
                });
            });
        } else {
          return new TaxonomyHelper().fetchTaxonomyTree(id).then((data) => {
            setSpots((state) => {
              return {
                ...state,
                [data._id]: data,
              };
            });
            setActiveId(id);
            setIndex((index) => index + 1);
          });
        }
      }
    });
  };

  return { getSpot, spots, activeId, index };
};
