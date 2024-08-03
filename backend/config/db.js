import mongoose from "mongoose";

export const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONOGO_URI).then(()=>{
    console.log("Database connected successfully");
     });
 ;
 
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}
 
