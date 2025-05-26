const router = require('express').Router();
const { login, register } = require('../controllers/auth.controller');

router.post('/login', login);
router.post('/register', register); // Only Admin can do this

module.exports = router;
