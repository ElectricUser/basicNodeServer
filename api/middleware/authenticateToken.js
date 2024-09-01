import jwt from 'jsonwebtoken'
import { tokenIsValid } from '../utils/tokenUtils.js'

export default function authenticateToken(req, res, next) {
    const authToken = req.headers.authorization
    console.log(authToken)
    if (authToken) {
        //verify token identity
        const formatedAutToken = authToken.split(' ')[1]
        const secretKey = process.env.SECRET_JWT_KEY
        const payload = jwt.verify(formatedAutToken, secretKey)
        if (payload) {
            // Confirms identity
            const validToken = tokenIsValid(payload)
            if (validToken) {
                console.log(identityConfirmation)
                next()
            } else {
                res.status(401).send({ message: "Session token has expired. Please log in" })
            }
        } else {
            // Forged identity
            req.status(401).send({
                message: "401 Unauthorized Forged token"
            })
        }
    } else {
        res.status(401).send({
            message: "401 Unauthorized"
        })
    }
}
