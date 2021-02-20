const app = require('./app');

var port = process.env.PORT 
//var port = 3000
app.listen(port, () => {
    console.log("Server started");
})