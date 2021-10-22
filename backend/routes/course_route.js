const express = require('express');
const router = express.Router();
const passportJwt = require('../middleware/passport_jwt')
const { body } = require('express-validator')
const courseController = require('../controllers/course_controller')
const CheckPermission = require('../middleware/checkPermission')

//http://localhost:4000/course
router.get('/',[passportJwt.isLogin], courseController.showcourse)

//http://localhost:4000/course/create
router.post('/create', [
    passportJwt.isLogin,            
    CheckPermission.isInstructor,
],[
    body('name').not().isEmpty().withMessage("Please enter your coursename"),
    body('category').not().isEmpty().withMessage("Please choose catagory course"),
    body('subject').not().isEmpty().withMessage("Please choose subject course")
], 
courseController.createcourse)

module.exports = router;