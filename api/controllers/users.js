import { User } from "../models/user.js";
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function registerUser(obj) {
    try {
        const exists = await User.find({ username: obj.username })
        console.log("User exists: ", exists)
        if (exists.length > 0
        ) {
            console.log("User exists returning early")
            return false
        } else {
            const user = obj
            const hashedPw = await encryptPassword(user.password)
            user.password = hashedPw
            const newUser = new User(user)
            const inserted = await newUser.save()
            if (inserted) {
                console.log(`user ${obj.username} inserted successfully`)
                return true
            } else {
                console.log("There was an error inserting the user")
                return false
            }
        }
    } catch (err) {
        console.log("There was an error inserting user;: ", err)
    } finally {
        return false
    }
}

// login
export async function authenticateUser(obj) {
    const username = obj.username
    const password = obj.password
    const user = await User.findOne({ username: username })
    if (user) {
        // user exists
        const hashedPw = user.password
        const passwordMatch = await bycrypt.compare(password, hashedPw)
        if (passwordMatch) {
            const token = generateJWT(user)
            // authentication successful
            return {
                "authenticate": true,
                "jwtToken": token
            }
        } else {
            // Incorrect password
            return {
                "authenticate": false,
                "message": "incorrect password"
            }
        }
    }
    // user does not exist
    return {
        "authenticate": false,
        "message": "user does not exist"
    }
}

async function encryptPassword(password) {
    const rounds = 8
    const salt = await bycrypt.genSalt(rounds)
    const hash = await bycrypt.hash(password, salt) //hash password with random salt
    return hash
}

function generateJWT(user) {
    const SECRET_KEY = process.env.SECRET_JWT_KEY
    const timeNow = Date.now()
    const expirationTime = timeNow + 3600000 // 1 hour token
    // generate JWT
    const token = jwt.sign({
        "email": user.email,
        "sub": user.username,
        "iat": timeNow,
        "exp": expirationTime
    }, SECRET_KEY)

    return token
}
