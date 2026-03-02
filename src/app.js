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
    // const id=req.body.id
    try {
        const user = await User.findOne()
        if (user.length === 0) {
            res.send("No user found")
        } 
        else { res.send(user) }

    }
    catch (err) {
        res.status(400).send("Something went wrong")

    }


})
// GET USER BY ID

app.get("/userId", async (req,res)=>{
    try{const userId= await User.findById("69a12103a38f224ed5e8e6e4")
    if(userId.length===0){
        res.send("No user found with this id")
    }
    else{
        res.send(userId)
    }

}
    catch(err){
        res.status(400).send("Something went wrong")

    }
    
    


}

)
// Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        if (users.length === 0) {
            res.send("No user found")
        }
        else {
            res.send(users)
        }
    }
    catch (err) {
        res.status(400).send("Something went wrong!!")

    }
})


ConnectDB().then(() => {
    console.log("Database connected Successfully")
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000")
    })

}).catch((err) => {
    console.log("Database not connect Successfully" + err)
})
