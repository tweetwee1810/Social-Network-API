const router = require('express').Router();
const thoughtRouter = require('./thought');
const userRouter = require('./user');

router.use('/thoughts', thoughtRouter);
router.use('/users', userRouter);

module.exports = router;