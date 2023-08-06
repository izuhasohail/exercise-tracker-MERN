import React, { useState } from "react"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar";
import CreateUser from "./components/create-user";
import CreateExercise from "./components/create-exercise";
import EditExercise from "./components/edit-exercise";
import ExerciseList from "./components/exercises-list";

function App() {

  return (
    <div className="app">
    <Router>
      <div className="container">
      <Navbar/>
      <br/>
      <Routes>
        <Route path="/" element={<ExerciseList/>}></Route>
        <Route path="/edit/:id" element={<EditExercise/>}></Route>
        <Route path="/create" element={<CreateExercise/>}></Route>
        <Route path="/user" element={<CreateUser/>}></Route>
      </Routes>
      </div>
    </Router>
    
    </div>
  )
}

export default App
