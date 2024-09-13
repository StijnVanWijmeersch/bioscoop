const { body } = require("express-validator");

const ticketValidator = {

    newTicketModelValidator: [
        body("presentationId").isNumeric({ min: 1 }).withMessage("Id must be a number").notEmpty(),
        body("totalPrice").isDecimal().notEmpty().withMessage("Price cannot be empty")
    ]
}

module.exports = ticketValidator;