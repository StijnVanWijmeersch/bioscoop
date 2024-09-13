const { body } = require("express-validator");

const userValidator = {

    newUserModelValidator: [
        body("firstName").trim().notEmpty().withMessage("firstname cannot be empty"),
        body("lastName").trim().notEmpty().withMessage("lastname cannot be empty"),
        body("email").trim().toLowerCase().isEmail().withMessage("Email is not valid"),
        body("password").trim().isLength({min: 8}).withMessage("Password must be at least 8 characters"),
        body("confirmPassword").trim().notEmpty().withMessage("Confirm the password!").custom((value, { req }) => {
            if(!value === req.body.password) {
                throw new Error("Passwords do not match!");
            } else {
                return true;
            }
        })
    ]
}

module.exports = userValidator;