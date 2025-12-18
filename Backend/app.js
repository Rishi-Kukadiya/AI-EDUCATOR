import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
dotenv.config();
const app = express();



app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"));


const connection = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log("Server is started!!");
    });
  } catch (error) {
    console.log(error);
  }
};

export default connection ;
export {app};