const jwt = require("jsonwebtoken");
require('dotenv').config()

verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" })
    }
  
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        
        //req.userId = decoded.id

        next()
    })
};

const auth = {
    verifyToken
}

module.exports = auth