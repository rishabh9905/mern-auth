import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"

dotenv.config();

mongoose 
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB".bgGreen);  
  })
  .catch((err) => {
    console.log(err);
  }); 
  
const app = express();
 
app.listen(3000, () => {
  console.log(`Server Listening on port 3000`.bgCyan);
});  
    