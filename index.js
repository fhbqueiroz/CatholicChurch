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

var enumsCommon = require('./commons/enums')
var saintRoutes = require('./routes/saint.routes')

app.use("/api", saintRoutes)
app.get('*', function(req, res) {
    res.send('Invalid url', enumsCommon.STATUS_CODE.NOT_FOUND);
});

var port = process.env.PORT
app.listen(port, () => {
    console.log("Server started");
})