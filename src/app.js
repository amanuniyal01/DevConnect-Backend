const express = require("express")
const app = express()
const ConnectDB = require("./config/database")
const cors = require("cors");
const cookieParser = require("cookie-parser")





app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

// const data=req.body
// Middleware express.json


app.use(express.json())
app.use(cookieParser())

const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')
const requestRouter=require('./routes/request')
app.use('/', authRouter)
app.use('/', profileRouter)
app.use('/',requestRouter)

ConnectDB().then(() => {

    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000")
    })

}).catch((err) => {
    console.log("Database not connect Successfully" + err)
})
