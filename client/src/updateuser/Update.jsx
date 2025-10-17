import React, { useEffect, useState } from 'react'
import "./update.css"
import { Link, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'


const UpdateUser = () => {
    const users = {
        name : "",
        email : "",
        address : "",
    };

    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const { id } = useParams();

    const inputhandler = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name] : value});
    };

    useEffect( () => {
        axios.get(`http://localhost:8000/api/userID/${id}`) 
        .then((response) => {
            setUser(response.data);
        })
        .catch((error)=> {
            console.log(error);
        })
    }, [id]);
    const submitform = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/updateUser/${id}`, user)    
        .then( (response) => {
            alert("User Updated successfully"); 
            navigate("/");
        })
        
        .catch( (err) => console.log("Error in adding user", err))
    }
  return (
    <div className='addUser'>
        <Link to="/" type="button" class="btn btn-secondary">
            <i class="fa-solid fa-backward"></i>  Back</Link>
        <h1>Update User</h1>
        
        <form className='addUserForm' onSubmit={submitform}>
        <div className='inputGroup'>
            <label htmlFor='name'>Name :</label>
            <input type="text" id="name" value={user.name} name="name" onChange={inputhandler} placeholder="Enter your name" />
        </div>
         <div className='inputGroup'>
            <label htmlFor='name'>Email :</label>
            <input type="email" id="email" value={user.email} name="email" onChange={inputhandler} placeholder="Enter your Email" />
        </div>
         <div className='inputGroup'>
            <label htmlFor='name'>Address :</label>
            <input type="text" id="address" value={user.address} name="address" onChange={inputhandler} placeholder="Enter your Address" />
        </div>
         <div className='inputGroup'>
            <button type='submit' className='btn btn-primary'>Update User</button>
        </div>
        </form>
    </div>
  )
}

export default UpdateUser



