const label = require('./label/labelRouter');
const color = require('./color/colorRouter');
const user = require('./user/userRouter');
const todo = require('./todo/todoRouter');
const router = require('express').Router();

router.use('/labels',label);
router.use('/colors',color);
router.use('/users',user);
router.use('/todos',todo);


module.exports = router;