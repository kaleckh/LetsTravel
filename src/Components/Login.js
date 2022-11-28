import React, { useEffect, useState } from "react";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Firebase";
function Login() {
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [createAccount, setCreateAccount] = useState(false);

  useEffect(() => {
    if (auth?.currentUser?.email) {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    }
  }, [auth?.currentUser?.email]);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
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

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div>
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
            <button onClick={register} className="">
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
            <input type="text" />
            <input type="text" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
