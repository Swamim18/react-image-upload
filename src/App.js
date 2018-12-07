import React, { Component } from "react";
import "./App.css";
import Image from "./components/image";
import Navbar from "./components/navbar";
import axios from "axios";

class App extends Component {
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
    return (
      <React.Fragment>
        <Navbar />
        <hr />
        <main className="container">
          <div className="jumbotron">
            <Image
              images={this.state.images}
              onUpload={this.uploadFile}
              onRemove={this.removeImageHandler}
            />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
