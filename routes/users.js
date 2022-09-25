const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidation } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
