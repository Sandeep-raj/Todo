const router = require('express').Router();
const auth = require('./auth');
const user = require('./user/userRouter');
const controller = require('./authController');

router.post('/signin',auth.verifyUser,controller.signin);
router.get('/',auth.decodeToken,auth.getUser);
router.use('/users',user);

module.exports = router;