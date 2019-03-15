import React, { Component } from "react";
import PropTypes from "prop-types";

import "./SpotUrlInput.css";

class SpotUrlInput extends Component {
  render() {
    return (
      <div className="SpotUrlInput">
        <input
          type="text"
          placeholder={this.props.spotUrl}
          onKeyPress={this.props.spotUrlUpdateFunction}
        />
      </div>
    );
  }
}

SpotUrlInput.propTypes = {
  spotUrl: PropTypes.string,
  spotUrlUpdateFunction: PropTypes.func
};

export default SpotUrlInput;
