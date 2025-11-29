import mongoose from "mongoose";
import 'dotenv/config'
const connectDB = async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/Fresho`)
        console.log("Database connected")
        
    }
    catch(error){
        console.error(error.message)

    }
}

export default connectDB