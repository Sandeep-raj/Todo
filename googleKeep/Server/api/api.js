const label = require('./label/labelRouter');
const color = require('./color/colorRouter');
const todo = require('./todo/todoRouter');
const router = require('express').Router();

router.use('/labels',label);
router.use('/colors',color);
router.use('/todos',todo);

module.exports = router;