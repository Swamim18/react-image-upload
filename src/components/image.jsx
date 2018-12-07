import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

class Image extends Component {
  uploadFile = files => {
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append("upload_preset", "cqyrvwj0");
      formData.append("api_key", "544373144457317");
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios
      return axios
        .post(
          "https://api.cloudinary.com/v1_1/sakhayadeep/image/upload",
          formData,
          {
            headers: { "X-Requested-With": "XMLHttpRequest" }
          }
        )
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url; //should store this URL for future references the app
          console.log(data);
        });
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
    });
  };

  render() {
    return (
      <React.Fragment>
        <Dropzone onDrop={this.uploadFile} multiple accept="image/*">
          <p>Drop your files here</p>
        </Dropzone>
      </React.Fragment>
    );
  }
}

export default Image;
