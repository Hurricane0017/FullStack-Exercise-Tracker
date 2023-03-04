import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/navbar"
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <br/>
        <Routes>
          <Route exact path="/" element={<ExercisesList/>}/>
          <Route exact path="/edit/:id" element={<EditExercise/>}/>
          <Route exact path="/create" element={<CreateExercise/>}/>
          <Route exact path="/user" element={<CreateUser/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;