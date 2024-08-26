import express from 'express'
import * as taskController from '../controllers/tasks.js'


export const router = express.Router()

router.get("/", async (req, res) => {
    let tasks = await taskController.getTasks()
    console.log(tasks)
    if (tasks.length != 0) {
        res.status(200).send({
            data: tasks
        })
    } else {
        res.status(200).send({
            "message": "Task list is empty"
        })
    }
})

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    let task = await taskController.getTask(id)
    if (task) {
        res.status(200).send({
            data: task
        })
    } else {
        res.status(200).send({
            "message": "Task list is empty"
        })
    }
})

router.post("/", (req, res) => {
    let task;
    let created;
    if (req.body) {
        task = {
            description: req.body.description,
            done: req.body.done,
            date: req.body.date
        }
        created = taskController.createTask(task)
    } else {
        res.status(400).send({
            "message": "missing required fields"
        })
    }
    if (created) {
        res.status(201).send({
            "message": "task added"
        })
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleted = await taskController.deleteTask(id)
    if (deleted) {
        res.sendStatus(204) // success no content
    } else {
        res.status(404).send({
            "message": "Content not found"
        })
    }
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { description, done, date } = req.body
    const task = {
        "description": description,
        "done": done,
        "date": date
    }
    const response = await taskController.updateTask(id, task)
    if (response) {
        res.status(200).send({ "message": "task changes applied" })
    }
})