import mongoose from "mongoose";
// import dotenv from "dotenv"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connection successfull");
        
    } catch (error) {
        console.error("DB connection failed : ",error)
        process.exit(0)
    }
}

export default connectDB