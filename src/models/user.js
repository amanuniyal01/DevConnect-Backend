const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


// Define the User schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minlength: 3,
            maxlength: 30,
            trim: true
        },

        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minlength: 3,
            maxlength: 30,
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Please Use a Valid Email")
                }
            }
        },

        age: {
            type: Number,
            min: [0, "Age cannot be negative"],
            max: [120, "Age seems invalid"]
        },

        gender: {
            type: String,
            enum: {
                values: ["Male", "Female", "Other"],
                message: "Gender must be Male, Female or Other"
            },
            default: "Other"
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            select: false,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Please use a Strong Password..")
                }
            }
        },

        photoUrl: {
            type: String,
            default: "https://www.prakrutimaa.com/images/profile.jpg",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Please use a valid URL.")
                }
            }

        },

        about: {
            type: String,
            maxlength: 200,
            default: "Developer exploring opportunities"
        },

        skills: {
            type: [String],
            validate: {
                validator: function (arr) {
                    return arr.length <= 10;
                },
                message: "Maximum 10 skills allowed"
            }
        }
    },
    {
        timestamps: true
    }
);
userSchema.methods.getJWTToken = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "CONNECT_1234", { expiresIn: "1d" })
    return token;




}
userSchema.methods.passwordValidation = async function (userInputPassword) {
    const user = this;
    const passwordHash = user.password
    const isValidPassword = await bcrypt.compare(userInputPassword, passwordHash);
    return isValidPassword;

}

// Create a User model from the schema(Always Starts with a capital letter)
const User = mongoose.model('User', userSchema);

module.exports = User;