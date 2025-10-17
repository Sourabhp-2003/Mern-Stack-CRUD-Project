import express from 'express';
import { createUser, getAllUser, getUserById, updateUser, deleteUser } from '../controller/userController.js';


const route = express.Router();
 route.post("/user", createUser);
 route.get("/users", getAllUser);
 route.get("/userID/:id", getUserById);
 route.put("/updateUser/:id", updateUser);
 route.delete("/deleteUser/:id", deleteUser);




export default route;