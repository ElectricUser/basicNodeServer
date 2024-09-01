import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './api/utils/databaseConfig.js';
import { router as tasksRouter } from './api/routes/tasks.js'
import { router as usersRouter } from './api/routes/users.js'
import cors from 'cors'
import bodyParser from 'body-parser';


// load environment variables
dotenv.config()
const app = express()
const PORT = 3000;
const logger = morgan('tiny')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(logger)
app.use(cors())
app.use(bodyParser.json())
app.use((err, req, res, next) => {
    res.status(500).send({ "message": "Internal server error" })
})
app.use("/tasks", tasksRouter)
app.use("/users", usersRouter)

// initialize database connection
connectDB()

app.listen(PORT, (req, res) => {
    console.log(`Server listening on http://localhost:${PORT}`)
})
