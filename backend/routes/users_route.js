const express = require('express');
const router = express.Router();
const passportJwt = require('../middleware/passport_jwt')
const { body } = require('express-validator')
const usersController = require('../controllers/users_controller')

// http://localhost:4000/user/register
router.post('/register',
  [
    //Check validation 
    body('username').not()
      .isEmpty().withMessage("Please enter your username")
      .isEmail().withMessage("Username must be an email"),
    body('password').not()
      .isEmpty().withMessage("Please enter your password")
      .isLength({ min: 10 }).withMessage("Please enter a password of at least 10 characters."),
    body('firstname').not()
      .isEmpty().withMessage("Please enter your firstname"),
    body('lastname').not()
      .isEmpty().withMessage("Please enter your lastname"),
    body('nickname').not()
      .isEmpty().withMessage("Please enter your nickname")
  ],
  usersController.register)

//http://localhost:4000/user/login
router.post('/login', [
  body('username').not()
    .isEmpty().withMessage("Please enter your username"),
  body('password').not()
    .isEmpty().withMessage("Please enter your password")
],
  usersController.login)

//http://localhost:4000/user/profile
router.get('/profile', [passportJwt.isLogin], usersController.profile)

//http://localhost:4000/user/update
router.put('/update', [passportJwt.isLogin], [
  body('firstname').not()
    .isEmpty().withMessage("Please enter your firstname"),
  body('lastname').not()
    .isEmpty().withMessage("Please enter your lastname"),
  body('nickname').not()
    .isEmpty().withMessage("Please enter your nickname")
], usersController.update)

module.exports = router;
