import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [createAccount, setCreateAccount] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (auth?.currentUser?.email) {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    }
  }, [auth?.currentUser?.email]);

  const handleSubmit = async (firstname, lastname, email) => {
    try{
    return await axios.post("http://localhost:3001/newperson", {
      firstname: firstName,
      lastname: lastName,
      email: registerEmail,
    });
  } catch (error) {
    console.log(error.message)
  }
  } 

  const register = async () => {
    try {
     return await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const Navigate = useNavigate();
  return (
    <div className="wholeScreen">
      {!createAccount ? (
        <div className="container">
          <div className="box">
            <input
              className="loginInput"
              type="text"
              placeholder="Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              className="loginInput"
              type="text"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <button
              onClick={() => {
                login();
                Navigate(`/person/${auth.currentUser.uid}`);
              }}
              className=""
            >
              Login
            </button>
            <button
              onClick={() => {
                setCreateAccount(!createAccount);
              }}
            >
              Create Account
            </button>
            {/* {user?.currentUser} */}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="box">
            <div
              onClick={() => {
                setCreateAccount(!createAccount);
              }}
            >
              Back
            </div>
            <div>Create Account!</div>
            <input
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              type="text"
            />
            <input
              onChange={(event) => {
                setLastName(event.target.value);
              }}
              type="text"
            />
            <input
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              className="loginInput"
              type="text"
            />
            <input
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
              className="loginInput"
              type="text"
            />
            <button
              onClick={() => {
                Promise.all([handleSubmit(), register()]).then(() => {
                  Navigate(`/person/${auth.currentUser.email}`);
                });
                console.log(handleSubmit(), register())
              }}
            >
              Create Account!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
