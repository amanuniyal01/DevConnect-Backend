const express = require("express")
const app = express()
const ConnectDB = require("./config/database")
const User = require("./models/user")
const bcrypt = require("bcrypt")
const { validateSignupData } = require("./utils/validation")
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

app.post("/signup", async (req, res) => {
    try {

        // Validation of Data...
        validateSignupData(req.body);
        
        // Encrypt the password...
        const { password } = req.body;
        const passwordHash=await bcrypt.hash(password,10)
        console.log(passwordHash)


        const user = new User(req.body);
        await user.save();

        res.send("User Added Successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

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

app.get("/userId", async (req, res) => {
    try {
        const userId = await User.findById("69a12103a38f224ed5e8e6e4")
        if (!userId) {
            res.send("No user found with this id")
        }
        else {
            res.send(userId)
        }

    }
    catch (err) {
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
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        if (Object.keys(data).length === 0) {
            return res.status(400).send("No data provided");
        }

        if (data.skills && data.skills.length > 10) {
            return res.status(400).send("Maximum 10 skills allowed");
        }
        if (data.age && data.age < 0) {
            return res.status(400).send("Age cannot be Negative")
        }

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k))
        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed")
        }

        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before", runValidator: true });

        res.send("User updated successfully")

    } catch (err) {
        res.status(400).send("Update Failed!" + err.message)
    }
}
)


ConnectDB().then(() => {
    console.log("Database connected Successfully")
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000")
    })

}).catch((err) => {
    console.log("Database not connect Successfully" + err)
})
