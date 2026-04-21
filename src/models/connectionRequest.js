const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    senderUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["interested", "ignored", "accepted", "rejected"],
            message: "{VALUE} is not a valid status"
        }
    }
}, { timestamps: true })
connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.senderUserId.equals(connectionRequest.receiverUserId)) {
        throw new Error("Users are not permitted to send connection requests to their own profile.")
    }
    next;

})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema)