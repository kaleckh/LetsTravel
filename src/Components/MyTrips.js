import React, { useState, useEffect } from "react";
import "./MyTrips.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MyTrips() {
  const [profileToggle, setProfileToggle] = useState(false);
  const [myTrips, setMyTrips] = useState("");
  const [myId, setMyId] = useState("")

  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/personTrips/${auth.currentUser.email}`,
    }).then((res) => {
      setMyId(res.data.id);
      axios({
        method: "get",
        url: `http://localhost:3001/personalTrips/${myId}`
      }).then((res) => {
        setMyTrips(res.data)
      })
    });
  }, []);

  return (
    <div>
      <header className="header">
        <div className="headerItem">Create a trip</div>
        <div
          onClick={() => {
            setProfileToggle(!profileToggle);
          }}
          className="headerItem"
        >
          My Profile
        </div>
      </header>
      {profileToggle ? (
        <div className="profileToggleContainer">
          <div className="profileToggleBox">
            <div
              onClick={() => {
                navigate("/myTrips");
              }}
            >
              My trips
            </div>
            <div
              onClick={(event) => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </div>
          </div>
        </div>
      ) : null}
      <div className="tripContainer">
        <div className="tripBox">
          {/* {myTrips.map((trip) => {
            return <div className="trip">{auth.currentUser.email}</div>;
          })} */}
        </div>
      </div>
    </div>
  );
}
export default MyTrips;
