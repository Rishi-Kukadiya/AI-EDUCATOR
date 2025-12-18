import mongoose from "mongoose";
const connectDB = async () => {
  try {

    const uri = process.env.MONGODB_STRING;
    const connection = await mongoose.connect(`${uri}`);
    console.log("MongoDb connected Sucessfully!!");

  } catch (error) {
    console.log("MongoDb connection error : ", error)
  }
};

export default connectDB;
