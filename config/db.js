import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error(`Error in mongodb ${error}`);
  }
};

export default connectDB;
