import "./Person.css";
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
  const [isSettingDate, setIsSettingDate] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myId, setMyId] = useState("");

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

  const logout = async () => {
    await signOut(auth);
  };

  let changedData = people.map((person) => {
    return {
      value: person.id,
      label: `${person.firstname}`,
    };
  });

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/personTrips/${auth.currentUser.displayName}`,
    }).then((res) => {
      setCreateTrip(res.data);
    });
  }, []);

  return (
    <div>
      <>
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
              onClick={() => {Navigate(`/profile/${auth.currentUser.uid}`)}}
              className="headerItem"
            >
              MY PROFILE
            </div>
          </div>
        </header>
      </>

      {createTrip ? (
        <div className="mainContainer">
          <div className="mainBox">
            <div className="title">Where are you going?</div>
            <Select
              className="mainInput"
              options={changedData}
              onChange={(obj) => {}}
            />
          </div>
          <div className="bottomContainer">
            <div>Meet new Friends!</div>
            <div>Check reviews on previous experiences from people</div>
            <div>Travel the world</div>
          </div>
        </div>
      ) : (
        <div>
          {isSettingLocation && (
            <div className="mainContainer">
              <div className="mainBox">
                <div className="backWrapper">
                  <button
                    onClick={() => {
                      setCreateTrip(true);
                    }}
                    className="back"
                  >
                    back
                  </button>
                </div>
                <input
                  placeholder="Where are you going?"
                  // onChange={(event) => {
                  //   setTripLocation(event.target.value);
                  // }}
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
            <div className="tripContainer">
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
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
