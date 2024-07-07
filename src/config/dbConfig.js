import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn && console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};
