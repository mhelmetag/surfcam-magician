import React from "react";
import { useHistory } from "react-router-dom";

import useLocation from "../hooks/useLocation";

import SelectWithDefault from "./SelectWithDefault";

const SpotPicker = () => {
  let history = useHistory();
  let [location, selected, setSelected, setLocation] = useLocation();

  return (
    <div>
      <div className="level">
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.continent}
            options={location.continents}
            selectFunc={event => {
              setSelected({
                continent: event.target.value,
                country: null,
                region: null,
                area: null,
                spot: null
              });
              setLocation({
                ...location,
                countries: [],
                regions: [],
                areas: [],
                spots: []
              });
            }}
            defaultText={"Select a Continent"}
          />
        </div>
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.country}
            options={location.countries}
            selectFunc={event => {
              setSelected({
                ...selected,
                country: event.target.value,
                region: null,
                area: null,
                spot: null
              });
              setLocation({ ...location, regions: [], areas: [], spots: [] });
            }}
            defaultText={"Select a Country"}
          />
        </div>
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.region}
            options={location.regions}
            selectFunc={event => {
              setSelected({
                ...selected,
                region: event.target.value,
                area: null,
                spot: null
              });
              setLocation({ ...location, areas: [], spots: [] });
            }}
            defaultText={"Select a Region"}
          />
        </div>
        <div className="level-item">
          <SelectWithDefault
            selectedOption={selected.area}
            options={location.areas}
            selectFunc={event => {
              setSelected({
                ...selected,
                area: event.target.value,
                spot: null
              });
              setLocation({ ...location, spots: [] });
            }}
            defaultText={"Select an Area"}
          />
        </div>
        <div className="level-item">
          <div className="select">
            <select
              defaultValue={selected.spot || "default"}
              onChange={event => {
                setSelected({ ...selected, spot: event.target.value });
              }}
            >
              <option value="default" disabled>
                Select a Spot
              </option>
              {location.spots.map(spot => {
                return (
                  <option
                    key={spot.id}
                    value={spot.id}
                    disabled={!spot.hasCameras}
                  >
                    {spot.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="level-item">
          <button
            className="button is-primary"
            disabled={selected.spot == null}
            onClick={() => history.push(`/spot/${selected.spot}`)}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotPicker;
