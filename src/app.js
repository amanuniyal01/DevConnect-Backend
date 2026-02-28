const express = require("express")
const app = express()
const ConnectDB = require("./config/database")
const User = require("./models/user")
// Middleware express.json
app.use(express.json())

app.post("/signup", async (req, res) => {

    // Creating a new instance of the User model  
    const user = new User(req.body)

    // Save the document to the database
    await user.save()
    res.send("User Added Successfully")

})

// GET ONE USER
app.get("/user", async (req, res) => {
    const email = req.body.email;
    try {
        const users = await User.find({ email })
        if(users.length===0){
            res.send("No user found")
        }
        res.send(user)
    }
    catch (err) {
        res.status(400).send("Something went wrong")

    }


})
// Feed API - GET/feed - get all the users from the database
app.get("/feed", (req, res) => {
    res.send("Data ")
})


ConnectDB().then(() => {
    console.log("Database connected Successfully")
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000")
    })

}).catch((err) => {
    console.log("Database not connect Successfully" + err)
})
