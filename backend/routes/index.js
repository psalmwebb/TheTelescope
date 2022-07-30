const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const validator = require('../utils/validator');
const schema = require('../utils/schema')


// @desc login  
router.route('/login')
    .post(validator(schema.loginSchema), controller.login);

// @desc register  
router.route('/register')
    .post(validator(schema.registerSchema), controller.register);

// @desc reset
// router.route('/resetPassword')
//     .post(validator(schema.resetPassword), controller.resetPassword)

module.exports = router;