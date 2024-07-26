const express = require("express");
const router = express.Router()
const userControllers = require('../controllers/UserController')
const { authMiddleWare, authUserMiddleWare } = require("../middleware/authMiddleware");

router.post('/sign-up', userControllers.createUser)
router.post('/sign-in', userControllers.loginUser)
router.post('/log-out', userControllers.logoutUser)
router.put('/update-user/:id', authUserMiddleWare, userControllers.updateUser)
router.delete('/delete-user/:id', authMiddleWare, userControllers.deleteUser)
router.post('/delete-many', authMiddleWare, userControllers.deleteMany)
router.get('/getAll'/*, authMiddleWare*/,userControllers.getAllUser)
router.get('/get-details/:id',authUserMiddleWare,userControllers.getDetailsUser)
router.post('/refresh-token', userControllers.refreshToken)

module.exports = router