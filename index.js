import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './api/utils/databaseConfig.js';
import { router as tasksRouter } from './api/routes/tasks.js'


// load environment variables
dotenv.config()
const app = express()
const PORT = 3000;
const logger = morgan('tiny')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use("/tasks", tasksRouter)

// initialize database connection
connectDB()

app.listen(PORT, (req, res) => {
    console.log(`Server listening on http://localhost:${PORT}`)
})