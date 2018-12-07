import React, { Component } from "react";
import Dropzone from "react-dropzone";

class Image extends Component {
  render() {
    const images = this.props.images.map((imgSrc, i) => {
      return (
        <div className="badge">
          <img style={{ width: 100 }} src={imgSrc} />
          <br />
          <button
            className="btn btn-danger m-2"
            id={i}
            onClick={this.props.onRemove.bind(this)}
            href="#"
          >
            Remove image
          </button>
        </div>
      );
    });
    return (
      <div className="d-flex flex-row ">
        <div className="col-4 p-2">
          <Dropzone onDrop={this.props.onUpload} multiple accept="image/*">
            <p className="text-center">Drop your files here</p>
          </Dropzone>
        </div>
        <div className="col-8 p-2">
          <div className="row-3 p-2">
            <h3>Drop 1 or more Images</h3>
          </div>
          <div className="row-9 p-2">
            <div className="column m-2">{images}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Image;
