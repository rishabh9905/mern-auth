import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors"
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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

app.use(express.json());
 
app.listen(3000, () => {
  console.log(`Server Listening on port 3000`.bgCyan);
});  
    

// ROUTES

// app.get("/", (req, res) => {
//   res.json({
//     message:"api is wroking"
//   });
// });/

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);