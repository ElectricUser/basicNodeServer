import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    try {
        await mongoose.connect(uri);
        console.log("Successfully connected to DB");
    } catch (err) {
        console.log("Error connecting to DB: ", err);
    }
};
