const router = require('express').Router();
const controller = require('./todoController');
const auth = require('../../auth/auth');

var authUser = [auth.decodeToken,auth.getUser];

router.param('id', controller.param);

router.route('/')
    .get(controller.get)
    .post(authUser,controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(authUser,controller.put);

module.exports = router;