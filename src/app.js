const express = require("express")
const app = express()
const ConnectDB = require("./config/database")
const User = require("./models/user")
const bcrypt = require("bcrypt")
const { validateSignupData } = require("./utils/validation")
const validator = require("validator");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
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

app.post("/signup", async (req, res) => {
    try {

        // Validation of Data...
        validateSignupData(req.body);

        const { firstName, lastName, email, password } = req.body;
        // Encrypt the password...
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName, lastName, email, password: passwordHash
        });
        await user.save();

        res.send("User Added Successfully");
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(400).send("Error :" + err.message)

    }


})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;



        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).send("Invalid Email Format");
        }

        // Find user
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).send("Invalid Credentials!");
        }

        // Compare password
        const isValidPassword = await bcrypt.compare(password, user.password);


        if (isValidPassword) {
            // Generate a JWT
            const token = await jwt.sign({ _id: user._id }, "CONNECT_1234")


            // Add the Token to cookie and send back to the user.
            res.cookie("token", token);
            res.send("Login Successfull")




        }
        else {
            return res.status(400).send("Invalid Credentials");
        }




    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.post("/sendConnectionRequest", async (req, res) => {
    console.log(" Connected successfully");
    res.send("Connection send successfully");
});


ConnectDB().then(() => {

    app.listen(3000, () => {
        console.log("Server is successfully listening on port 3000")
    })

}).catch((err) => {
    console.log("Database not connect Successfully" + err)
})
