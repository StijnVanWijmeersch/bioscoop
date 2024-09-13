const prisma = require("../configuration/prisma_db");
const { validationResult } = require("express-validator")


const seatsController = {

    findAllByRoomId: async (req, res) => {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(500).json(validationErrors.array());
        }

        const roomId = req.params.id;

        try {
            const seatsForRoom = await prisma.seat.findMany({
                where: {
                    roomId: Number.parseInt(roomId)
                }
            })

            if(!seatsForRoom) {
                return res.status(404).send("Tickets not found");
            }

            res.status(200).json(seatsForRoom);

        } catch(err) {
            res.status(500).send("Something went wrong getting seats")
        }
    },

    createReservedSeats: async(req, res) => {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(500).json(validationErrors.array());
        }

        const { reservedSeats } = req.body;

        try {
            const seatsAdded = await prisma.seat_Ticket.createMany({
                data: [ ...reservedSeats ]
            });

            res.status(201).json(seatsAdded);

        } catch(err) {
            res.status(500).send("Something went wrong reserving seats");
        }

    }
}

module.exports = seatsController;