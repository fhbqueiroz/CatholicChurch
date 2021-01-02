var express = require('express');
var router = express.Router();

const saintsController = require('../controllers/saints.controller')

//control total requests per minute
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: process.env.TOTAL_MINUTES_PER_REQUESTS * 60 * 1000, 
    max: process.env.REQUESTS_PER_MINUTE 
});
router.use(limiter); //use all routes

//delay requests
const slowDown = require('express-slow-down');
const speedLimiter = slowDown({
    windowMs: process.env.TOTAL_MINUTES_PER_REQUESTS * 60 * 1000, 
    delayAfter: process.env.REQUESTS_MAXIMUM_SPEED, 
    delayMs: process.env.REQUESTS_DELAY_MS 
});
router.use(speedLimiter); //use all routes

router
    .route('/saints')
    .get(saintsController.findAll)
    .post(saintsController.insert)

router
    .route('/saints/:id')
    .get(saintsController.findOne)
    .put(saintsController.update)
    .delete(saintsController.delete)

module.exports = router;