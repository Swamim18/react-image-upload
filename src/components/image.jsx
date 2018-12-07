import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

class Image extends Component {
  state = {
    images: []
  };

  uploadFile = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map((file, id) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append("timestamp", (Date.now() / 1000) | 0);

      const url =
        "https://api.cloudinary.com/v1_1/" +
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME +
        "/image/upload";

      // Make an AJAX upload request using Axios
      return axios
        .post(url, formData, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; //should store this URL for future references the app
          console.log(data);

          //adding into the state
          let updatedImages = [...this.state.images];
          updatedImages.push(fileURL);
          this.setState({ images: updatedImages });
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
  };

  removeImageHandler = event => {
    event.preventDefault();
    let updatedImages = [...this.state.images];
    updatedImages.splice(event.target.id, 1);
    this.setState({ images: updatedImages });
  };

  render() {
    const images = this.state.images.map((imgSrc, i) => {
      return (
        <div className="badge">
          <img style={{ width: 100 }} src={imgSrc} />
          <br />
          <button
            className="btn btn-danger m-2"
            id={i}
            onClick={this.removeImageHandler.bind(this)}
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
          <Dropzone onDrop={this.uploadFile} multiple accept="image/*">
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
