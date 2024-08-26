import { Task } from '../models/task.js'

export async function getTasks() {
    const tasks = await Task.find({})
    return tasks
}

export async function getTask(id) {
    const task = await Task.find({ _id: id })
    if (task) {
        return task
    }
    return false
}

export async function createTask(obj) {
    const task = new Task(obj)
    const inserted = await task.save()
    if (inserted) {
        console.log("Task inserted")
    } else {
        console.log("Task not inserted")
    }
    return inserted
}

export async function deleteTask(id) {
    const task = await Task.findOneAndDelete({ _id: id });
    if (task) {
        return true
    }
    return false
}

export async function updateTask(id, obj) {
    const task = await Task.findOneAndUpdate({ _id: id }, obj);
    if (task) {
        return true
    }
    return false
}