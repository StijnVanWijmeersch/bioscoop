const prisma = require("../configuration/prisma_db");
const { validationResult } = require("express-validator")

const ticketController = {

    findAllByUserId: async (req, res) => {

        const userId = req.params.userId;

        try {
            const ticketsForUser = await prisma.ticket.findMany({
                where: {
                    userId: Number.parseInt(userId),
                    payed: true
                },
                include: {
                    presentation: {
                        include: {
                            movie: true,
                            room: true
                        }
                    },
                    seatTickets: {
                        include: {
                            seat: true
                        }
                    }
                }
            })

            if(!ticketsForUser) {
                return res.status(404).send("Tickets not found");
            }

            res.status(200).json(ticketsForUser);

        } catch(err) {
            res.status(500).send("Something went wrong getting tickets")
        }
    },
    
    findByUserTicketId: async (req, res) => {

        const { userId, ticketId } = req.params;

        try {
            const ticketForUser = await prisma.ticket.findUnique({
                where: {
                    id: Number.parseInt(ticketId),
                    userId: Number.parseInt(userId)
                },
                include: {
                    presentation: {
                        include: {
                            movie: true,
                            room: true
                        }
                    }
                }
            });

            if(!ticketForUser) {
                return res.status(404).send("Tickets not found");
            }

            res.status(200).json(ticketForUser);

        } catch(err) {
            console.log(err)
            res.status(500).send("Something went wrong getting ticket")
        }
    },

    createTicket: async (req, res) => {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(500).json(validationErrors.array());
        }

        const { presentationId, totalPrice } = req.body;
        const userId = req.userId;
        try {

            const ticket = await prisma.ticket.create({
                data: {
                    presentationId: presentationId,
                    userId: userId,
                    totalPrice: totalPrice
                },
                include: {
                    presentation: {
                        include: {
                            movie: true,
                            room: true
                        }
                    }
                }
            });
            res.status(201).json(ticket);

        } catch(err) {
            res.status(500).send("Something went wrong adding ticket");
        }
    },

    setTicketPayed: async (req, res) => {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(500).json(validationErrors.array());
        }

        const ticketId = req.params.id;

        try {
            const ticket = await prisma.ticket.update({
                where: {
                    id: Number.parseInt(ticketId)
                },
                data: {
                    payed: true,
                    purchaseDate: new Date(Date.now())
                }
            });

            res.status(204).json(ticket);

        } catch(err) {
            console.log(err)
            res.status(500).send("Something went wrong updating ticket");
        }
    }
}

module.exports = ticketController;
