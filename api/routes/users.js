import express from 'express'
import * as userController from '../controllers/users.js'

export const router = express.Router()

router.post("/register", (req, res) => {
    const user = req.body
    console.log(req.body)
    const insertedUser = userController.registerUser(user)
    if (insertedUser) {
        res.status(201).send({ "message": "user created" })
    } else {
        res.status(400).send({ "message": "Error: user already exists" })
    }
})

router.post("/login", async (req, res) => {
    const user = req.body
    console.log("User body: ", user)
    const response = await userController.authenticateUser(user)
    if (response.authenticate) {
        console.log("Authenticated")
        const token = response.jwtToken
        res.set("Authorization", `Bearer ${token}`)
        res.set('Access-Control-Expose-Headers', '*')
        res.sendStatus(200).end()
        console.log(res.get('Authorization'))
    } else {
        if (response.message === "incorrect credentials") {
            res.status(401).send({
                "message": "incorrect password"
            })
        }
        if (response.message === "user does not exist") {
            res.status(401).send({
                "message": "user does not exist"
            })
        }
    }
})
