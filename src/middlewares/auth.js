const jwt = require("jsonwebtoken")
const user = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).send("Unauthorized");
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