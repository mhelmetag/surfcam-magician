import React, { Component } from 'react';

class StreamUrlInput extends Component {
  render() {
    return (
      <div className="StreamUrlInput">
        <input
          type="text"
          placeholder={this.props.streamUrl}
          onKeyPress={this.props.onKeyPressFunction}
        />
      </div>
    )
  }
}

export default StreamUrlInput;
