const url = "mongodb+srv://nodejsLearning:Xm1KKmRhBCBx7nBa@nodejslearning.s8t9lgg.mongodb.net/devConnect"
const mongoose = require("mongoose")
const ConnectDB = async () => {
    await mongoose.connect(url)
}
module.exports = ConnectDB