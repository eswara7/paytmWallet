const express = require("express")
const { userRouter } = require("./userRouter")
const { accountRouter } = require("./accountRouter")
const mainRouter = express.Router()


// app.use("user",userRouter);
// app.use("account",accountRouter);

module.exports=mainRouter