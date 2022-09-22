const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFound = require('../errors/not-found-err');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);
router.use('/', usersRouter);
router.use('/', moviesRouter);

router.use('/*', (req, res, next) => next(new NotFound('Неверный путь')));

module.exports = router;
