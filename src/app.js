const express = require("express")
const app = express()
const ConnectDB = require("./config/database")
const User = require("./models/user")

app.post("/signup", async (req, res) => {
    // Creating a new instance of the User model
    const user = new User({
        firstName: "Pooja",
        lastName: "Gauniyal",
        email: "poojaxyz@gmail.com",
        age: "26",
        gender: "Female",
    })

    // Save the document to the database
    await user.save()
    res.send("User Added Successfully")

})



ConnectDB().then(() => {
    console.log("Database connected Successfully")
    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000")
    })

}).catch((err) => {
    console.log("Database not connect Successfully" + err)
})
