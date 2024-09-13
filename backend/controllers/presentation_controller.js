const prisma = require("../configuration/prisma_db")
const { validationResult } = require("express-validator")


const presentationController = {

    findAll: async (req, res) => {

        try {
            const presentations = await prisma.presentation.findMany({
                include: {
                    movie: true,
                    room: true
                }
            })
            res.json(presentations);
        } catch(err) {
            res.status(500).send("Something went wrong getting presentations")
        }
    },

    findById: async (req, res) => {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(500).json(validationErrors.array());
        }

        //get the id from urlparam
        const requestId = req.params.id;

        try {
            const presentation = await prisma.presentation.findUnique({
                where: {
                    id: Number.parseInt(requestId)
                },
                include: {
                    movie: true,
                    room: true,
                    seatTicker: {
                        include: {
                            seat: true
                        }
                    }
                }
            })

            if(!presentation) {
                return res.status(404).send("Presentation not found")
            }
            
            res.status(200).json(presentation);
        } catch(err) {
            res.status(500).send("Something went wrong getting presentation")
        }
    },

    findByMovieId: async (req, res) => {

        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(500).json(validationErrors.array());
        }

        const movieId = req.params.id;

        try {
            const presentationWithMovieId = await prisma.presentation.findMany({
                where: {
                    movieId: Number.parseInt(movieId)
                },
                include: {
                    room: true
                }
            })
            res.json(presentationWithMovieId);
        } catch(err) {
            res.status(500).send("Something went wrong getting presentations with movieId");
        }
    }
}

module.exports = presentationController;