const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const senderUserId = req.user._id;
        const receiverUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatusTypes = ["interested", "ignored"];

        const toUser = await User.findById(receiverUserId)
        if (!toUser) {
            return res.status(400).json({ message: "User not found", data: toUser })

        }
        console.log(toUser.firstName)

        if (!allowedStatusTypes.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type",
                status
            })

        }
        const isConnectionRequestExist = await ConnectionRequest.findOne({
            $or: [
                { senderUserId, receiverUserId },
                { senderUserId: receiverUserId, receiverUserId: senderUserId }
            ]

        })
        if (isConnectionRequestExist) {
            return res.status(400).send("User has already sent you a request.")
        }
        const connectionRequest = new ConnectionRequest({
            senderUserId,
            receiverUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({
            message: `${req.user.firstName} has ${status} ${toUser.firstName}'s profile`,
            data
        });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = requestRouter;