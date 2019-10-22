import React, { useState, useEffect } from "react";

import TaxonomySearcher from "../lib/TaxonomySearcher";

function useContinents() {
  const [continents, setContinents] = useState([]);

  function updateContinents(continents) {
    setContinents(continents);
  }

  useEffect(() => {
    async function fetchContenents() {
      const taxonomySearcher = new TaxonomySearcher();
      const tree = await taxonomySearcher.fetchContinents();
      const continents = tree.contains.map(geo => {
        return {
          name: geo.name,
          id: geo._id
        };
      });

      updateContinents(continents);
    }

    fetchContenents();
  }, []);

  return continents;
}

const SpotPicker = () => {
  const continents = useContinents();

  return (
    <div className="SpotPicker">
      <select defaultValue={"default"}>
        <option value="default" disabled>
          Select a Continent
        </option>
        {continents.map(continent => {
          return (
            <option key={continent.id} value={continent.id}>
              {continent.name}
            </option>
          );
        })}
      </select>
      <select defaultValue={"default"}>
        <option value="default" disabled>
          Select a Country
        </option>
      </select>
      <select defaultValue={"default"}>
        <option value="default" disabled>
          Select a Region
        </option>
      </select>
      <select defaultValue={"default"}>
        <option value="default" disabled>
          Select an Area
        </option>
      </select>
      <select defaultValue={"default"}>
        <option value="default" disabled>
          Select a Spot
        </option>
      </select>
      <button>Go</button>
    </div>
  );
};

export default SpotPicker;
