const express = require("express");
const movieController = require("../controllers/movie_controller");
const { findByIdValidator } = require("../validators/validator");
const router = express.Router();


//*GET: /movies
router.get('/', movieController.findAll);

//*GET: /movies/1
router.get('/:id([0-9]+)', findByIdValidator, movieController.findById);


module.exports = router;