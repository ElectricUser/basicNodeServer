import mongoose from "mongoose";
const { Schema } = mongoose

const taskSchema = new mongoose.Schema({
    description: String,
    done: Boolean,
    date: Date
})

// Model name first letter must be higher case and singular (Task not Tasks)
export const Task = mongoose.model('Task', taskSchema);