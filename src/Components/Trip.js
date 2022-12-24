import "./Trip.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";

function Home() {
  const Navigate = useNavigate();
  const [tripLocation, setTripLocation] = useState("");
  const [people, setPeople] = useState([]);
  const [tripDates, setTripDates] = useState("");
  const [createTrip, setCreateTrip] = useState(true);
  const [profileToggle, setProfileToggle] = useState(false);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(false);

  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <header className="header">
        <div
          onClick={() => {
            Navigate(`/person/${auth.currentUser.uid}`);
          }}
          className="home"
        >
          Home
        </div>
        <div className="headerButtonContainer">
          <div
            onClick={(event) => {
              setIsSettingLocation(true);
              setIsAddingTrip(false);
              setCreateTrip(false);
            }}
            className="headerItem"
          >
            CREATE A TRIP
          </div>
          <div
            className="headerItem"
            onClick={() => {
              Navigate(`/myTrips/${auth.currentUser.uid}`);
            }}
          >
            MY TRIPS
          </div>
          <div
            onClick={() => {
              Navigate(`/profile/${auth.currentUser.uid}`);
            }}
            className="headerItem"
          >
            MY PROFILE
          </div>
        </div>
      </header>
      <div className="tripMainContainer">
        <div className="leftTripContainer">
          <div className="personaltriptitle">Venice, Italy</div>
          <div className="personaltripdate">December 3-5, 2023</div>
          <img
            className="tripImage"
            src={require("../photos/kidsFace.jpg")}
            alt=""
          />
        </div>
        <div className="rightTripContainer">
          <div className="daysTill">
            <div className='daysTillText'>days till</div>
            <div className='daysTillNumber'>200</div>
          </div>
          <div className="boxContainer">
            <div className='smallerTitle'>Whose Coming</div>
            <div className='tripbox'></div>
            <div className='smallerTitle'>Flights</div>
            <div className='tripbox'></div>
            <div className='smallerTitle'>Housing</div>
            <div className='tripbox'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
