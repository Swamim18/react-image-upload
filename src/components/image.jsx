import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

class Image extends Component {
  state = {
    images: []
  };

  uploadFile = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", process.env.CLOUDINARY_PRESET);
      formData.append("api_key", process.env.CLOUDINARY_API_KEY);
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/" +
            process.env.CLOUDINARY_CLOUD_NAME +
            "/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; //should store this URL for future references the app
          console.log(data);

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

  render() {
    const imageList = this.state.images.map(imgSrc => {
      return (
        <li>
          <img src={imgSrc} />
        </li>
      );
    });
    return (
      <React.Fragment>
        <Dropzone onDrop={this.uploadFile} multiple accept="image/*">
          <p>Drop your files here</p>
        </Dropzone>
        <div className="App">
          <ol>{imageList}</ol>
        </div>
      </React.Fragment>
    );
  }
}

export default Image;
