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

const validateUpdateProfileData = (req) => {
    const ALLOWED_UPDATES = [
        "firstName",
        "lastName",
        "age",
        "gender",
        "photoUrl",
        "skills",
        "about"
    ];


    const isUpdateAllowed = Object.keys(req.body).every(field =>
        ALLOWED_UPDATES.includes(field)
    );

    if (!isUpdateAllowed) {
        throw new Error("This field cannot be updated.");
    }

    const { age, photoUrl, skills, about } = req.body;

    //  Age validation
    if (age !== undefined && (age < 18 || age > 100)) {
        throw new Error("Invalid Age");
    }

    //  URL validation 
    if (photoUrl && !validator.isURL(photoUrl)) {
        throw new Error("Please use a valid photo URL.");
    }

    //  Skills validation
    if (skills && skills.length > 200) {
        throw new Error("Please add valid skills.");
    }

    //  About validation
    if (about && (about.length < 10 || about.length > 100)) {
        throw new Error("About must be between 10 to 100 characters.");
    }

    return true;
};
const validatePassword = (req) => {
    const UPDATES_ALLOWED = ["newPassword", "confirmPassword"]
    const isAllowedUpdatePassword = Object.keys(req.body).every((field) => UPDATES_ALLOWED.includes(field))
    const { newPassword, confirmPassword } = req.body
    if (!newPassword || !confirmPassword) {
        throw new Error("All password fields are required.")
    }
    if (newPassword !== confirmPassword) {
        throw new Error("Password not matching.")
    }
    if (!validator.isStrongPassword(newPassword)) {
        throw new Error("Please use a strong password.")
    }
    return isAllowedUpdatePassword;

}

module.exports = validateUpdateProfileData;

module.exports = { validateSignupData, validateUpdateProfileData, validatePassword }