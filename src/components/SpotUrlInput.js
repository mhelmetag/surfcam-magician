import React, { Component } from 'react';

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

export default SpotUrlInput;
