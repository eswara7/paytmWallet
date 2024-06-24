const express = require('express')
const { signUp, getUsers, signIn, updateUser, getBulk } = require('../controllers/userController')
const { authMiddleware } = require('../middleware')
const userRouter = express.Router()

userRouter.post("/signup",signUp)
//userRouter.get("/users",getUsers)
userRouter.post("/signin",signIn)
userRouter.put("/update",authMiddleware,updateUser)
userRouter.get("/bulk",authMiddleware,getBulk)

module.exports = {
    userRouter
}