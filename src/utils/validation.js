const validator = require('validator')
const validateSignupData = (req) => {
    const { firstName, lastName, password, email } = req;
    if (!firstName || !lastName) {
        throw new Error("Name is Required")
    }
    else if (firstName.length < 4 || firstName.length > 50 || lastName.length < 2 || lastName.length > 50) {
        throw new Error("Invalid userName please use a valid Name.")
    }
    else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid.")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Please use a strong password")
    }

}
module.exports={validateSignupData}