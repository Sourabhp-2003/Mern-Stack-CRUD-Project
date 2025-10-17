import React, { useState } from 'react'
import "./addUser.css"
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const AddUser = () => {
    const users = {
        name : "",
        email : "",
        address : "",
    };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const inputhandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name] : value});
    };

    const submitform = async(e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user", user)
        .then( (response) => {
            alert("User added successfully");
            navigate("/");
        })
        
        .catch( (err) => console.log("Error in adding user", err))
    }
  return (
    <div className='addUser'>
        <Link to="/" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-backward"></i>  Back</Link>
        <h1>Add New User</h1>
        
        <form className='addUserForm' onSubmit={submitform}>
        <div className='inputGroup'>
            <label htmlFor='name'>Name :</label>
            <input type="text" id="name" name="name" onChange={inputhandler} placeholder="Enter your name" />
        </div>
         <div className='inputGroup'>
            <label htmlFor='name'>Email :</label>
            <input type="email" id="email" name="email" onChange={inputhandler} placeholder="Enter your Email" />
        </div>
         <div className='inputGroup'>
            <label htmlFor='name'>Address :</label>
            <input type="text" id="address" name="address" onChange={inputhandler} placeholder="Enter your Address" />
        </div>
         <div className='inputGroup'>
            <button type='submit' className='btn btn-primary'>Add User</button>
        </div>
        </form>
    </div>
  )
}

export default AddUser



