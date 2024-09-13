const prisma = require("../configuration/prisma_db");
const { validationResult } = require("express-validator")

//* MOVIE CRUD OPERATIONS
const movieController = {

    findAll: async (req, res) => {
        try {
            const movies = await prisma.movie.findMany({
                include: {
                    genres: true,
                    actors: true
                }
            });
            res.json(movies);
        } catch(err) {
            res.status(500).send("Something went wrong when getting movies");
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

            const movie = await prisma.movie.findUnique({
                where: {
                    id: Number.parseInt(requestId)
                },
                include: {
                    genres: true,
                    actors: true
                }
            });

            if(!movie) {
                return res.status(404).send("Movie not found");
            }

            res.status(200).json(movie);

        } catch(err) {
            res.status(500).send("Something went wrong getting movie");
        }
    }


}

module.exports = movieController;