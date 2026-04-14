const express = require('express')
const profileRouter = express.Router()
const { userAuth } = require('../middlewares/auth')

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(400).send("Error :" + err.message)

    }


})

profileRouter.patch("/profile/update", (req, res) => {
    try {
        res.send("Profile updated successfully.")

    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }


})
module.exports = profileRouter;