const express = require('express')
const profileRouter = express.Router()
const { userAuth } = require('../middlewares/auth');
const { validateUpdateProfileData, validatePassword } = require('../utils/validation');
const bcrypt = require("bcrypt")


profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user)
    }
    catch (err) {
       return res.status(400).send("Error :" + err.message)

    }


})

profileRouter.patch("/profile/update", userAuth, async (req, res) => {
    try {
        if (!validateUpdateProfileData(req)) {
            throw new Error("This field cannot be updated.")
        }
        const LoggedInUser = req.user
        Object.keys(req.body).forEach((key) => LoggedInUser[key] = req.body[key])
        await LoggedInUser.save()






        res.json({
            message: `${LoggedInUser.firstName} Your Profile has been updated successfully.`,
            data: LoggedInUser
        })
    }
    catch (err) {
        res.status(400).send("Error :" + err.message)
    }


})
profileRouter.patch("/profile/update/password", userAuth, async (req, res) => {
    try {
        if (!validatePassword(req)) {
            throw new Error("Invalid update Request.")
        }
        const loggedInUser = req.user;
        const { newPassword } = req.body;
        const passwordHash = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = passwordHash;
        await loggedInUser.save()
        res.json({ message: `${loggedInUser.firstName} your password has changed successfully.` })


    }
    catch (err) {
        res.status(400).send("Error:" + err.message)
    }


})
module.exports = profileRouter;