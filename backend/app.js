import express from "express";
import mongoose from 'mongoose';
import Scheme from './src/models/scheme.js';
import schemeData from './src/config/db.js'; 
import cors from "cors"; 
import dotenv from "dotenv"; 
dotenv.config(); 

import governmentSchemesRoutes from "./src/routes/governmentSchemesRoutes.js"; 

import weatherRoutes from "./src/routes/weatherRoutes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://agriconnect-fronted.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose.connect(MONGO_URI);
console.log('Connected to MongoDB');



app.use("/api/weather", weatherRoutes);
app.use("/api/government-schemes", governmentSchemesRoutes); 



app.listen(PORT,'0.0.0.0',()=>{
    console.log(`server is running on port ${PORT}`);
})
