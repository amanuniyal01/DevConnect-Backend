const express = require('express')
const requestRouter = express.Router()
const { userAuth } = require('../middlewares/auth')
const ConnectionRequest = require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const senderUserId = req.user._id;
        const receiverUserId = req.params.toUserId;
        const status = req.params.status;

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