import React, { useState, useEffect } from "react";
import "./MyTrips.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MyTrips() {
  const [profileToggle, setProfileToggle] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");
  const [tripToggle, setTripToggle] = useState(true);
  const [tripLocation, setTripLocation] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/person/${auth.currentUser.email}`,
    }).then((res) => {
      axios({
        method: "get",
        url: `http://localhost:3001/personTrips/${res.data[0].id}`,
      }).then((res) => {
        setIsLoading(false);
        setMyTrips(res.data);
      });
    });
  }, []);

  return (
    <div>
      <header className="header">
        <div
          onClick={(event) => {
            setTripToggle(!tripToggle);
          }}
          className="headerItem"
        >
          Create a trip
        </div>
        <div className="headerItem">My Profile</div>
      </header>
      {tripToggle ? (
        isLoading ? (
          <div>Loading</div>
        ) : (
          <div className="tripContainer">
            <div
              onClick={() => {
                console.log(myTrips);
              }}
              className="tripBox"
            >
              {myTrips.map((trip) => {
                return <div>{trip.trip_location}</div>;
              })}
            </div>
          </div>
        )
      ) : (
        <div className="tripContainer">
          <div className="tripBox">
            <input
              onChange={(event) => {
                setTripLocation(event.target.value);
              }}
              type="text"
            />
            <input
              onChange={(event) => {
                setTripDates(event.target.value);
              }}
              type="text"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default MyTrips;
