var express = require('express');

var app = express()
var helmet = require("helmet")
var morgan = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors')
var dotenv = require('dotenv').config()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('tiny'))

var enumsCommon = require('./utils/enums')
var authRoute = require('./routes/auth.route')
var saintRoute = require('./routes/saint.route')

app.use("/api", authRoute)
app.use("/api", saintRoute)
app.get('*', function(req, res) {
    res.status(enumsCommon.STATUS_CODE.NOT_FOUND).send('<h1>Invalid url</h1>');
});

// var port = process.env.PORT
// app.listen(port, () => {
//     console.log("Server started");
// })

module.exports = app;