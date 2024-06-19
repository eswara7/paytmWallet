const express = require("express")
const { dbConnection } = require("./dbConnection");
const PORT = 3000;
require('dotenv').config();
const { mainRouter } = require("./routes/mainRouter");
const { userRouter } = require("./routes/userRouter");
const { accountRouter } = require("./routes/accountRouter");
const cors = require('cors')
const app = express()


app.use(express.json());
app.use(cors());

dbConnection();
app.use("/api/v1/user",userRouter);
app.use("api/v1/account",accountRouter)
app.use((err,req,res)=>{
    res.status(500).send("somthing broke!")
})
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
});