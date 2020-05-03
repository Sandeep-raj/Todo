const controller = require('./colorController');
const router = require('express').Router();


router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(controller.put)

module.exports = router;