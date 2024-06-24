const express = require('express')
const { authMiddleware } = require('../middleware')
const { transferBalance, getBalance } = require('../controllers/accountController')
const  accountRouter = express.Router()

accountRouter.get("/balance",authMiddleware,getBalance)
accountRouter.post("/transfer",authMiddleware,transferBalance)
module.exports = {
    accountRouter
}