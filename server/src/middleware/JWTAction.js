require("dotenv").config()
import jwt from "jsonwebtoken";

const creatJwt = (data) => {
    let payload = data
    let key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key)
        console.log(token)
    } catch (err) {
        console.log(err)
    }
    return token
}

const verifyJwt = (token) => {
    let key = process.env.JWT_SECRET
    let data = null
    try {
        data = jwt.verify(token, key)
    } catch (error) {
        console.log(e)
    }
    console.log(data)
    return data
}

module.exports = {
    creatJwt,
    verifyJwt
}