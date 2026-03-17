const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minLength: 4 },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, min: 0 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], },
    password: { type: String, select: false, trim: true, minLength: 6 },
    photoUrl: { type: String, default: "https://www.prakrutimaa.com/images/profile.jpg" },
    about: { type: String, default: "Dev is in Search for someone here" },
    skills: {
        type: [String]
    }
});

// Create a User model from the schema(Always Starts with a capital letter)
const User = mongoose.model('User', userSchema);

module.exports = User;