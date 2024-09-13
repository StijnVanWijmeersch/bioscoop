const express = require("express");
const ticketController = require("../controllers/ticket_controller");
const ticketValidator = require("../validators/ticket_validator");
const authMiddleware = require("../middlewares/auth_middleware");
const { findByIdValidator } = require("../validators/validator");
const router = express.Router();


//*GET: /tickets/user/1
router.get("/user/:userId([0-9]+)", authMiddleware, ticketController.findAllByUserId)

//*GET: /tickets/user/1/ticket/1
router.get("/user/:userId([0-9]+)/ticket/:ticketId([0-9]+)",ticketController.findByUserTicketId)

//*POST: /tickets
router.post("/", authMiddleware, ticketValidator.newTicketModelValidator, ticketController.createTicket)

//*PUT: /tickets/1
router.put('/:id([0-9]+)', authMiddleware, findByIdValidator, ticketController.setTicketPayed)


module.exports = router;