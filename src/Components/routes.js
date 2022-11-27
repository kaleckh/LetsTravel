import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Person from "./Person"


export default (
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/person/:id" element={<Person/>}/>
    </Routes>
  </BrowserRouter>
);
