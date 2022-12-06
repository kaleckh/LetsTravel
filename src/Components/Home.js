import "./Home.css";
import React, {  useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {Link, useNavigate} from 'react-router-dom';


function Home() {
  const [people, setPeople] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/people`,
    }).then((res) => {
      setPeople(res.data)
    });
  },[])

  let changedData = people.map((person) => {
    return {value: person.id, label: `${person.firstname},${person.location}`} 
  })

    return (
      <div>
        <header className="header">
          <div className="headerItem">Create a trip!</div>
          <div onClick={() => {
            navigate('/login')
          }}  className="headerItem">Login!</div>
        </header>
        <div className="main">Where do you wanna go?</div>
        <div className="container">
          <Select className="input" options={changedData} onChange={(obj) => {
            
          }}/>
        </div>
      </div>
    );
  }




export default Home;
