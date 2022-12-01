import React, { useState, useEffect } from "react";
import "./MyTrips.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MyTrips() {
  const [profileToggle, setProfileToggle] = useState(false);
  const navigate = useNavigate();
  const [people, setPeople] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  console.log(search, "search");


  
  const logout = async () => {
    await signOut(auth);
  };
  

  useEffect(() => {
    console.log(auth.currentUser, "this is the uids")
    axios({
      method: "get",
    url: `http://localhost:3001/personTrips/${auth.currentUser.uid}`,
    }).then((res) => {
      setPeople(res.data);
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
        <div className="tripBox"></div>
      </div>
    </div>
  );
}
export default MyTrips;
