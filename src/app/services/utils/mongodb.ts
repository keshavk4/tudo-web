import mongoose from "mongoose";

/**
 * The function `connectMongoDB` connects to a MongoDB database using the `MONGODB_URI` environment
 * variable.
 */
const connectMongoDB = async () => {
  try {
    if (process.env.MONGODB_URI == undefined) {
      throw new Error("Please Define MONGODB_URI");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.error(error);
  }
};

export default connectMongoDB;