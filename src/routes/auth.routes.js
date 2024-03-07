const express = require('express');

const { body } = require('express-validator');
const router = express.Router();
const User = require('../model/user.model');
const authController = require('../controller/auth.controller');

router.post(
 '/signup',
 [
  body('name').trim().not().isEmpty(),
  body('email')
   .isEmail()
   .withMessage('Please enter a valid email.')
   .custom(async (email) => {
    const user = await User.find(email);
    if (user[0].length > 0) {
     return Promise.reject('Email address already exist!');
    }
   })
   .normalizeEmail(),
  body('password').trim().isLength({ min: 7 }),
 ],
 authController.signup
);

router.post('/login', authController.login);

router.put('/forgot_password', authController.forgot_password);
router.put('/reset_password', authController.reset_password);

module.exports = router;



