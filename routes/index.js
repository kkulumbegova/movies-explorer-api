const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const { signupValidation, signinValidation } = require('../middlewares/validation');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);
router.use('/', usersRouter);
router.use('/', moviesRouter);

module.exports = router;
