const router = require('express').Router();
const cardRouter = require('./card.api.router')
const authRouter = require('./auth.api.router');
const tokensRouter = require('./tokens.api.router');

router.use('/tokens', tokensRouter);
router.use('/auth', authRouter);
router.use('/card', cardRouter)


module.exports = router;
