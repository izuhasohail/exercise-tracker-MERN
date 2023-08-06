import React, { useState } from 'react'
import axios from 'axios';

function CreateUser() {

  const[user,setUser]=useState({username:''})


  function onChangeUsername(e){
    setUser((prevState)=>
    (
      {
      ...prevState,
      username:e.target.value
      }
    ))
  }

  function onSubmit(e){
    e.preventDefault();

    console.log(user);
      /*backend end-point */
      axios.post('http://localhost:5000/users/add',user)
     .then(res=>console.log(res.data));


    setUser((prevUserName)=>
    (
      {
        ...prevUserName,
        username:''
      }
      ));
  }


  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
          <label>Username:</label>
          <input

          type='text'
          className='form-control'
          value={user.username}
          onChange={(e)=>onChangeUsername(e)}
          required
          
          />
        </div>

        <div className="form-group">
          <input type='submit' value='Create User'
          className='btn btn-primary mt-3'/>
        </div>
      </form>
    </div>
  )
}

export default CreateUser
