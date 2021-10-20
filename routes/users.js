const router = require('express').Router();
const {
  // eslint-disable-next-line no-unused-vars
  getCurrentUser, updateUser, signOut,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUser);

module.exports = router;
