const express = require('express')
const profileRouter = express.Router()
const { userAuth } = require('../middlewares/auth');
const { validateUpdateProfileData } = require('../utils/validation');

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
        res.status(400).send("Error :" + err.message)

    }


})

profileRouter.patch("/profile/update", userAuth, (req, res) => {
    try {
        if (!validateUpdateProfileData(req)) {
            throw new Error("This field cannot be updated.")
        }
        const LoggedInUser = req.user
        Object.keys(req.body).forEach((key) => LoggedInUser[key] = req.body[key])






        res.send('Profile Updated Successfully..')
    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }


})
module.exports = profileRouter;