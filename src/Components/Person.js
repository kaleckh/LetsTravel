import "./Person.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [createTrip, setCreateTrip] = useState(true);
  const [profileToggle, setProfileToggle] = useState(false);

  let changedData = people.map((person) => {
    return {
      value: person.id,
      label: `${person.firstname},${person.location}`,
    };
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/people`,
    }).then((res) => {
      setPeople(res.data);
    });
  }, []);

  return (
    <div>
      {createTrip ? (
        <>
          <header className="header">
            <div className="headerItem">Create a trip</div>
            <div onClick={() => {
              setProfileToggle(!profileToggle)
            }} className="headerItem">My Profile</div>
          </header>
          {profileToggle ? (
            <div className="profileToggleContainer">
              <div className="profileToggleBox">
                <div>My trips</div>
                <div>Logout</div>
              </div>
            </div>
          ) : null}
          <div className="main">Where do you wanna go?</div>
          <div className="container">
            <Select
              className="input"
              options={changedData}
              onChange={(obj) => {
                console.log(obj);
              }}
            />
          </div>
        </>
      ) : (
        <>
          <header className="header">
            <div className="headerItem">Create a trip</div>
            <div
              onClick={() => {
                navigate("/login");
              }}
              className="headerItem"
            >
              My Profile
            </div>
          </header>
          <div className="createTripContainer">
            <div className="createTripBox"></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
