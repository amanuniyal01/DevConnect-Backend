const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const senderUserId = req.user._id;
        const receiverUserId = req.params.toUserId;
        const status = req.params.status;
        const allowedStatusTypes = ["interested", "ignored"];
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
        res.json({ message: "Request sent !", data });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = requestRouter;