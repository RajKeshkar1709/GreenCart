import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/Fresho`)
        console.log("Database connected")
        
    }
    catch(error){
        console.error("Database connection failed:", error.message)
        throw error; // Rethrow to prevent silent failures
    }
}

export default connectDB