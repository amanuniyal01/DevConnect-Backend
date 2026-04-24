const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router()

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser=req.user;
        console.log(loggedInUser)

    }
    catch (err) {
        res.status(400).send("error: " + err.message)
    }


})

module.exports = userRouter;