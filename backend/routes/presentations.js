const express = require("express");
const presentationController = require("../controllers/presentation_controller");
const { findByIdValidator } = require("../validators/validator");
const router = express.Router();


//*GET /presentations
router.get('/', presentationController.findAll);

//*GET /presentations/1
router.get('/:id([0-9]+)', findByIdValidator, presentationController.findById);

//*GET /presentations/movie/1
router.get('/movie/:id([0-9]+)', findByIdValidator, presentationController.findByMovieId);

module.exports = router;