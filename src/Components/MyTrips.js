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

  const Navigate = useNavigate();
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
        <div
          onClick={() => {
            Navigate(`/person/${auth.currentUser.uid}`);
          }}
          className="home"
        >
          HOME
        </div>
        <div className="headerButtonContainer">
          <div
            onClick={(event) => {
              setIsSettingLocation(true);
              setIsAddingTrip(false);
            }}
            className="headerItem"
          >
            CREATE A TRIP
          </div>
          <div
            onClick={() => {
              Navigate(`/myTrips/${auth.currentUser.uid}`);
            }}
            className="headerItem"
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
      {isAddingTrip &&
        (isLoading ? (
          <div className="wholeScreen">
            <div className="tripContainer">
              <div>Loading</div>
            </div>
          </div>
        ) : (
          <div className="wholeScreen">
            <div className="tripContainer">
              <div className="title">CURRENT TRIPS</div>
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
                      <>
                        <div onClick={() => {Navigate(`/trip/${auth.currentUser.uid}`)}} className="tripBox">
                          <div className="tripLocation">
                            <div>{trip.trip_location}</div>
                          </div>
                          <div className="tripDate">
                            <div>{trip.trip_dates}</div>
                          </div>
                          <>
                            {/* <button>edit trip</button>
                              <button
                                onClick={() => {
                                  handleDelete(trip.id);
                                }}
                              >
                                delete trip
                              </button> */}
                          </>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
              <div className="tripLocation">+ NEW TRIP</div>
            </div>
          </div>
        ))}
      {isSettingLocation && (
        <div className="wholeScreen">
          <div className="createTripContainer">
            <div className="backWrapper">
              <button
                onClick={() => {
                  setIsAddingTrip(true);
                  setIsSettingLocation(false);
                }}
                className="back"
              >
                back
              </button>
            </div>
            <input
              className="input"
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
            >
              Next!
            </button>
          </div>
        </div>
      )}
      {isSettingDate && (
        <div className="wholeScreen">
          <div className="createTripContainer">
            <div className="backWrapper">
              <button
                onClick={() => {
                  setIsSettingDate(false);
                  setIsSettingLocation(true);
                }}
                className="back"
              >
                back
              </button>
            </div>
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
            >
              Create Trip!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default MyTrips;
