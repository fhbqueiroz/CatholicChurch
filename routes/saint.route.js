var express = require('express');
var router = express.Router();

const securityMiddleware = require('../middlewares/security.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const saintsController = require('../controllers/saints.controller')

router.use(securityMiddleware.limiterRequests())
router.use(securityMiddleware.slowDownRequests())

router
    .route('/saints')
    .get(authMiddleware.verifyToken, saintsController.findAll)
    .post(authMiddleware.verifyToken, saintsController.insert)

router
    .route('/saints/:id')
    .get(authMiddleware.verifyToken, saintsController.findOne)
    .put(authMiddleware.verifyToken, saintsController.update)
    .delete(authMiddleware.verifyToken, saintsController.delete)

module.exports = router;