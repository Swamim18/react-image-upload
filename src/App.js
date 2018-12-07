import React, { Component } from "react";
import "./App.css";
import Image from "./components/image";
import Navbar from "./components/navbar";
require("dotenv").config();

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <div className="App">
            <Image />
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
