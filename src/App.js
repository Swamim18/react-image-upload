import React, { Component } from "react";
import "./App.css";
import Image from "./components/image";
import Navbar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <hr />
        <main className="container">
          <div className="jumbotron">
            <Image />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
