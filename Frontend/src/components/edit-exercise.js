import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const [username, setUsername] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const id=useParams();

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/'+id.id)
      .then(res=>{
        setUsername(res.data.username);
        setDesc(res.data.description);
        setDuration(res.data.duration);
        setDate(res.data.date.substting(0,10));
      })
    
    axios.get('http://localhost:5000/users/')
      .then(res=>{
        if(res){
          setUsers(res.data.map(user=>user.username));
        }
      })
  }, []);
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  }
  const onChangeDescription = (e) => {
    setDesc(e.target.value);
  }
  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  }
  const onChangeDate = (date) => {
    setDate(date);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: username,
      description: desc,
      duration: duration,
      date: date
    }
    console.log(exercise);
    axios.post('http://localhost:5000/exercises/update/'+id,exercise)
      .then(res=>console.log(res.data))
      .catch(err=>console.log(err));
    window.location = '/';
  }
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}>
            {
              users.map((user) => {
                return <option
                  key={user}
                  value={user}>{user}
                </option>;
              })
            }
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={desc}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}

export default EditExercise;