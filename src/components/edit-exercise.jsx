import React, { useEffect } from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditExercise(props) {
  const navigate=useNavigate();

  const {id}=useParams();

  const[exercise,setExercise]=useState({username:'',description:'', duration:0,date:new Date(),});
  const [users,setUser]=useState([]);


  useEffect(()=>{

    axios.get('http://localhost:5000/exercises/'+id)
    .then(response=>
      setExercise(prevExercise=>({...prevExercise,
        username:response.data.username,
        description:response.data.description,
        duration:response.data.duration,
        date:new Date(response.data.date)
      })))
      .catch(er=>console.log(er));


   
  axios.get('http://localhost:5000/users/')
  .then(response=>{

    if(response.data.length>0){
      setUser(
        response.data.map(user=>user.username)
      )
    }
  })
  },[])

  const handleOnChange=(e)=>{
    const {name,value}=e.target;
    setExercise((prevState)=>({
      ...prevState,
      [name]:value,
    }))
  }
   
  /* 
  DatePicker component from react-datepicker 
  doesn't use the standard e.target.value approach
   to pass the selected date to the onChange function.
    Instead, the onChange function receives the 
    selected date directly as an argument.
  */
  const handleDateChange = (date) => {
    setExercise((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  function onSubmit(e){
    e.preventDefault();

    console.log(exercise);

     axios.post('http://localhost:5000/exercises/update/'+id,exercise)
     .then(res=>console.log(res.data));



    navigate('/');
  }
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
          <label>Username:</label>
          <select
          name="username"
          className='form-control'
          value={exercise.username}
          onChange={(e)=>handleOnChange(e)}
          required>
            {
              users?.map((user)=>
              {
                return <option key={user} value={user}>{user}</option>
              }
              )
            }
          </select>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
          type='text'
          className='form-control'
          name="description"
          value={exercise.description}
          onChange={(e)=>handleOnChange(e)}
          required
          />
        </div>

        <div className="form-group">
          <label>Duration (in minutes):</label>
          <input
          type='text'
          className='form-control'
          name="duration"
          value={exercise.duration}
          onChange={(e)=>handleOnChange(e)}
          required/>
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
            selected={exercise.date}
            onChange={(e)=>handleDateChange(e)}
            name="date"
           />
          </div>
        </div>


        <div className="form-group mt-4">
          <input type='submit' value='Edit Exercise Log' className='btn btn-primary'/>
        </div>
      </form>
      
    </div>
  )
}

export default EditExercise
