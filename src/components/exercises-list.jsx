import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Exercise from './Exercise';
function ExerciseList() {
  const[exercises,setExercises]=useState([]);


  useEffect(()=>{

    axios.get('http://localhost:5000/exercises/')
    .then(response=>setExercises(response.data))
    .catch(err=>console.log(err))

  },[])

  function deleteExercise(id){
    axios.delete('http://localhost:5000/exercises/'+id)
    .then(res=>console.log(res.data));

    setExercises(exercises.filter(ex=>ex._id!==id))
  }

  function exerciseList(){
    return exercises.map(currentexercise=>{
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id}/> 
    })
  }

  return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className='thead-light'>
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
  )
}

export default ExerciseList
