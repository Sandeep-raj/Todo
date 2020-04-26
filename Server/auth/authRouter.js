const router = require('express').Router();
const auth = require('./auth');
const controller = require('./authController');

router.post('/signin',auth.verifyUser,controller.signin);


module.exports = router;