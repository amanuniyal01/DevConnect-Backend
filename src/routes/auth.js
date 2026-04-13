const express = require('express')
const authRouter = express.Router()
const { validateSignupData } = require('../utils/validation')
const User = require("../models/user")
const validator = require("validator");
const bcrypt = require("bcrypt")

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
        const isValidPassword = await user.passwordValidation(password)


        if (isValidPassword) {
            // Generate a JWT
            const token = await user.getJWTToken()
            console.log(token)


            // Add the Token to cookie and send back to the user.
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
            res.send("Login Successfull")




        }
        else {
            return res.status(400).send("Invalid Credentials");
        }




    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

module.exports = authRouter;