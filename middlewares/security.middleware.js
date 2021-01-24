const rateLimit = require("express-rate-limit")
const slowDown = require('express-slow-down');
require('dotenv').config()

//control total requests per minute
const limiterRequests = () => {

    return rateLimit({
        windowMs: process.env.TOTAL_MINUTES_PER_REQUESTS * 60 * 1000, 
        max: process.env.REQUESTS_PER_MINUTE 
    })
}

const slowDownRequests = () => {
    
    return slowDown({
        windowMs: process.env.TOTAL_MINUTES_PER_REQUESTS * 60 * 1000, 
        delayAfter: process.env.REQUESTS_MAXIMUM_SPEED, 
        delayMs: process.env.REQUESTS_DELAY_MS 
    })
}

const security = {
    limiterRequests,
    slowDownRequests
}

module.exports = security