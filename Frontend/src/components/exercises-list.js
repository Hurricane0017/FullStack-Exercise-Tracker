import axios from 'axios';
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const ExercisesList = () => {
  const [exercises, setExercises] = useState(['hey']);
  useEffect( () => {
    axios.get('http://localhost:5000/exercises/')
      .then(res => {
        setExercises(res.data);
      })
      .catch(err => console.log(err));
  },[]);

  const Exercise = (props) => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <Link to="/" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</Link>
      </td>
    </tr>
  )

  const deleteExercise = (id) => {
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    setExercises(exercises.filter(e => e._id !== id));
  }
  const exerciseList=()=>{
    return exercises.map(e=>{
      return <Exercise exercise={e} deleteExercise={deleteExercise} key={e._id}/>
    })
  }


  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exerciseList()}
        </tbody>
      </table>
    </div>
  );
}

export default ExercisesList;