const jwt = require("jsonwebtoken")
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log(token)

        if (!token) {
            return res.status(401).send("Please Login First");
        }

        const decoded = jwt.verify(token, "CONNECT_1234");

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
};

module.exports = {
    userAuth
}