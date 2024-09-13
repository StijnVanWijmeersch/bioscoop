const express = require("express");
const authController = require("../controllers/auth_controller");
const authMiddleware = require("../middlewares/auth_middleware");
const router = express.Router();

//*POST: auth/login
router.post('/login', authController.login)

//*GET: auth/logout
router.get('/logout', authController.logout)

//*GET: auth/verify
router.get('/verify', authMiddleware, authController.verify)


module.exports = router;