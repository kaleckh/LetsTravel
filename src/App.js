import "./App.css";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      filteredData: "",
    };
  }
  componentDidMount() {
    this.getPeople();
  }

  getPeople() {
    return axios({
      method: "get",
      url: `http://localhost:3001/people`,
    }).then((res) => {
      this.setState({
        people: res.data,
      });
    });
  }

  render() {
    return (
      <div>
        <div className="main">Where do you wanna go?</div>
        <div className="container">
          <input className="input"
          placeholder="Search..."
            onChange={(event) => {
              this.setState({
                filteredData: event.target.value,
              });
            }}
            type="text"
            name=""
            id=""
          />
          {this.state.people
            .filter((person) => {
              return person.location
                .toLowerCase()
                .includes(this.state.filteredData);
            })
            .map((person) => {
              return (
                <div>
                  <div>{person.location}</div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
