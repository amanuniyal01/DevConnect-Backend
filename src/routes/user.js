const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router()

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const receivedConnectionRequests = await connectionRequest.find({
            receiverUserId: loggedInUser._id,
            status:"interested"
        })
        res.json({ message: "Data fetched Successfully", data: receivedConnectionRequests })

    }
    catch (err) {
        res.status(400).send("error: " + err.message)
    }


})

module.exports = userRouter;