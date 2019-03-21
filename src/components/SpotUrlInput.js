import React from "react";
import PropTypes from "prop-types";

import "./SpotUrlInput.css";

const SpotUrlInput = ({ spotUrl, spotUrlUpdateFunction }) => {
  return (
    <div className="SpotUrlInput">
      <input
        type="text"
        placeholder={spotUrl}
        onKeyPress={spotUrlUpdateFunction}
      />
    </div>
  );
};

SpotUrlInput.propTypes = {
  spotUrl: PropTypes.string,
  spotUrlUpdateFunction: PropTypes.func
};

export default SpotUrlInput;
