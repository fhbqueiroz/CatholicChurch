const router = require('express').Router()
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller')

router
    .route('/login')
    .post(authMiddleware.verifyToken, authController.login)

router
    .route('/logout')
    .post(authMiddleware.verifyToken, authController.logout)
    
router
    .route('/authenticate')
    .post(authController.authenticate)

module.exports = router;