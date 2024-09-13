const { body } = require("express-validator");


const seatValidator = {

    newSeatsValidator: [
        body('reservedSeats').isArray(),
        body('*.*.seatId').isNumeric().notEmpty(),
        body('*.*.ticketId').isNumeric().notEmpty(),
        body('*.*.presentationId').isNumeric().notEmpty()
    ]
};


module.exports = seatValidator;