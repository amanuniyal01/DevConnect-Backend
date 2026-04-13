const express = require("express")
const app = express()
const ConnectDB = require("./config/database")
const cors = require("cors");
const cookieParser = require("cookie-parser")
const { userAuth } = require("./middlewares/auth")


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));



// const data=req.body
// Middleware express.json
const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "skills",
    "about"

]

app.use(express.json())
app.use(cookieParser())
const authRouter = require("./routes/auth")
app.use('/', authRouter)







app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    res.send(user.firstName + " " + "has sent you a Request.");
});


ConnectDB().then(() => {

    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000")
    })

}).catch((err) => {
    console.log("Database not connect Successfully" + err)
})
