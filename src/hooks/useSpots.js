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
        if (index === 4) {
          return new TaxonomyHelper().fetchTaxonomyTree(id, 1).then((data) => {
            const taxonomyId = data._id;
            setSpots((state) => {
              return {
                ...state,
                [taxonomyId]: data,
              };
            });
            setActiveId(id);
            setIndex((index) => index + 1);

            const spotIds = data.contains
              .filter((spot) => spot.type === "spot")
              .map((spot) => spot.spot);

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
              .then((data) => data.data)
              .then((data) => {
                setSpots((state) => {
                  const newContains = state[taxonomyId].contains.map((spot) => {
                    const cameras = data.find((d) => d._id === spot.spot)
                      .cameras;
                    return {
                      ...spot,
                      cameras,
                    };
                  });
                  debugger;
                  return {
                    ...state,
                    [taxonomyId]: {
                      ...state[taxonomyId],
                      contains: newContains,
                    },
                  };
                });
              });

            return data;
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
            return data;
          });
        }
      }
    });
  };

  return { getSpot, spots, activeId };
};
