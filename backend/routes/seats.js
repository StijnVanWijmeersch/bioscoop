const express = require("express");
const seatsController = require("../controllers/seat_controller");
const authMiddleware = require("../middlewares/auth_middleware");
const { findByIdValidator } = require("../validators/validator");
const seatValidator = require("../validators/seat_validator");
const router = express.Router();


//* GET: seats/room/1
router.get('/room/:id([0-9]+)', findByIdValidator, seatsController.findAllByRoomId);

//*POST: seats/reserve
router.post('/reserve', authMiddleware, seatValidator.newSeatsValidator, seatsController.createReservedSeats);

module.exports = router;