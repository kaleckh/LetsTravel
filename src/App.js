import "./App.css";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="main">Where do you wanna go?</div>
        <div className="input">
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default App;
