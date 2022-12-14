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

  const [tripLocation, setTripLocation] = useState("");
  const [tripDates, setTripDates] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingLocation, setIsSettingLocation] = useState(false);
  const [isAddingTrip, setIsAddingTrip] = useState(true);
  const [isSettingDate, setIsSettingDate] = useState(false);

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
      setMyId(res.data[0].id);
      axios({
        method: "get",
        url: `http://localhost:3001/personTrips/${res.data[0].id}`,
      }).then((res) => {
        setIsLoading(false);
        setMyTrips(res.data);
      });
    });
  }, []);
  const handleSubmit = async (id, location, dates) => {
    try {
      let newTrip = await axios.post("http://localhost:3001/newtrip", {
        id: myId,
        location: tripLocation,
        dates: tripDates,
      });
      setMyTrips([...myTrips, newTrip.data[0]]);
      setIsAddingTrip(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      let deleteTrip = await axios.delete(
        `http://localhost:3001/deletetrip/${id}`,
        {}
      );
      setMyTrips(myTrips.filter((trip) => trip.id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <header className="header">
        <div className="home">Home</div>
        <div className="headerButtonContainer">
          <div
            onClick={(event) => {
              setIsSettingLocation(true);
              setIsAddingTrip(false);
            }}
            className="headerItem"
          >
            Create a trip
          </div>
          <div className="headerItem">My Profile</div>
        </div>
      </header>
      {isAddingTrip &&
        (isLoading ? (
          <div>Loading</div>
        ) : (
          <div>
            <div className="tripContainer">
              {myTrips.length === 0 ? (
                <>
                  <div className="bigTags">
                    Oops looks like you have no trips!
                  </div>
                  <div>Create one Here</div>
                </>
              ) : (
                <>
                  {myTrips.map((trip) => {
                    return (
                      <div className="tripBox">
                        <div className="trip">
                          {trip.trip_location} {trip.trip_dates}
                        </div>
                        <>
                          <button>edit trip</button>
                          <button
                            onClick={() => {
                              handleDelete(trip.id);
                            }}
                          >
                            delete trip
                          </button>
                          ;
                        </>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        ))}
      {isSettingLocation && (
        <div className="tripContainer">
          <button className="back">back</button>
          <input
            placeholder="Where are you going?"
            onChange={(event) => {
              setTripLocation(event.target.value);
            }}
            type="text"
          />
          <button
            onClick={() => {
              setIsSettingDate(true);
              setIsSettingLocation(false);
            }}
          >Next!</button>
        </div>
      )}
      {isSettingDate && (
        <div className="tripContainer">
          <button className="back">Back</button>
          <input
            placeholder="What are the dates?"
            onChange={(event) => {
              setTripDates(event.target.value);
            }}
            type="text"
          />
          <button
            onClick={() => {
              Promise.all([setIsSettingDate(false), handleSubmit()]).then(
                () => {
                  setIsAddingTrip(true);
                }
              );
            }}
          >Create Trip!</button>
        </div>
      )}
    </div>
  );
}
export default MyTrips;
