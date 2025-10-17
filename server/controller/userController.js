import User from "../model/usermodel.js";

export const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const {email} = newUser;

        const  UserExists = await User.findOne({email});
        if (UserExists){
            return res.status(400).json({message: "User already exists"});
        }
        const savedUser = await newUser.save();
        // res.status(200).json(savedUser);
        res.status(200).json({message: "User added successfully"});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const getAllUser = async (req, res) => {
    try {
        const Userdata = await User.find();
        if (!Userdata || Userdata.length === 0) {
            return res.status(404).json({message: "No users found"});
        }
        res.status(200).json(Userdata);
    } catch (error) {
         res.status(500).json({message: error.message});
    }
};

export const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateUser = async (req, res) => {
    try {
         const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        // res.status(200).json(updatedUser);
        res.status(200).json({message: "User updated successfully"});
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
         const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({message: "User not found"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted successfully"});
    } catch (error) {
         res.status(500).json({message: error.message});
    }
};