import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import route from './routes/userRoute.js';   
import cors from 'cors';

dotenv.config(); // ✅ Load .env file
   

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose
    .connect(MONGOURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch ((err)=>{
        console.log("Error connecting to MongoDB:", err);
    })

    app.use("/api", route);