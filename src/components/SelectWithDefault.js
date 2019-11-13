import React from "react";
import PropTypes from "prop-types";

const SelectWithDefault = ({
  selectedOption = null,
  options,
  selectFunc,
  defaultText
}) => {
  return (
    <div className="select">
      <select defaultValue={selectedOption || "default"} onChange={selectFunc}>
        <option value="default" disabled>
          {defaultText}
        </option>
        {options.map(option => {
          return (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

SelectWithDefault.propTypes = {
  selectedOption: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
  ),
  selectFunc: PropTypes.func.isRequired,
  defaultText: PropTypes.string.isRequired
};

export default SelectWithDefault;
