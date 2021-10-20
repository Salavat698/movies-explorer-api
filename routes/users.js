const router = require('express').Router();
const {
  // eslint-disable-next-line no-unused-vars
  getCurrentUser, updateUser, signOut,
} = require('../controllers/users');

const {
  createUserValidation,
  updateProfileValidation,
} = require('../middlewares/validators');

router.get('/users/me', createUserValidation, getCurrentUser);
router.patch('/users/me', updateProfileValidation, updateUser);

module.exports = router;
