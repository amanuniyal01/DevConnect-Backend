const express = require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router()
const USER_DETAILS = "firstName lastName age gender photoUrl about skills "

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const receivedConnectionRequests = await connectionRequest.find({
            receiverUserId: loggedInUser._id,
            status: "interested"
        }).populate(
            "senderUserId", ["firstName", "lastName"]
        )
        if (receivedConnectionRequests.length === 0) {
            return res.status(400).send("No connection Request Found")
        }
        res.json({ message: "Data fetched Successfully", data: receivedConnectionRequests })

    }
    catch (err) {
        res.status(400).send("error: " + err.message)
    }


})
userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await connectionRequest.find({
            $or: [
                {
                    senderUserId: loggedInUser._id, status: "accepted"

                },
                {
                    receiverUserId: loggedInUser._id, status: "accepted"
                }
            ]
        }).populate("senderUserId", USER_DETAILS).populate("receiverUserId", USER_DETAILS)
        const data = connections.map((row) => {
            if (row.senderUserId._id.toString() === loggedInUser._id.toString()) {
                return row.receiverUserId
            }
            return row.senderUserId


        })
        res.json({
            data
        })
    }
    catch (err) {
        res.status(400).send("error: " + err.message)
    }


})
userRouter.get("/user/feed", userAuth,async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connections = await connectionRequest.find({
            $or: [
                { senderUserId: loggedInUser._id },
                { receiverUserId: loggedInUser._id }
            ]

        }).select("senderUserId receiverUserId").populate("senderUserId","firstName").populate("receiverUserId","firstName")
        
        res.json({
            data: connections
        })

    }
    catch (err) {
        res.status(400).send("Error :" + err.message)

    }

})

module.exports = userRouter;