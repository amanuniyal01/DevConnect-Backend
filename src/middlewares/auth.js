const jwt = require("jsonwebtoken")
const user = require("../models/user");
const User = require("../models/user");
const userAuth = async (req, res) => {
    try {

        const { token } = req.cookies
        if (!token) {
            throw new Error("Invalid Token.")
        }

        //Validating token
        const decodedMessage = jwt.verify(token, "CONNECT_1234")
        const { _id } = decodedMessage

        const user = await User.findById(_id)
        if (!user) {
            throw new Error("User not found !!")

        }


        res.send(user)
    }
    catch (err) {
        res.status(400).send("Error :" + err.message)

    }




}

module.exports = {
    userAuth
}