import React, { Component } from "react";
import "./Login.css"

class Login extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container">
                <div className="box">
                    <input className="loginInput" type="text" name="" id="" />
                    <input className="loginInput" type="text" />
                    <button className="">Login</button>
                </div>
            </div>
        )
    }


}


export default Login