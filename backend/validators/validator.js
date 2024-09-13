const { body, param } = require("express-validator");

const validator = {
    findByIdValidator: [
        param("id").isNumeric().withMessage("id must be a number")
    ]
}

module.exports = validator