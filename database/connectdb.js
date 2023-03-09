import mongoose from "mongoose";

export const connectdb = async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("🔥🔥🔥🔥🔥🔥 DB conectada")
    } catch (error) {
        console.log("db error")
    }
}