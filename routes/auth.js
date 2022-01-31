const express = require("express");
const Route = express.Router(); 
const authController = require('../controller/booking/auth');

const router = express.Router();
router.post('/data', authController.data);
router.post('/delete', authController.delete);
router.post('/DayBooking', authController.DayBooking);

module.exports = router;