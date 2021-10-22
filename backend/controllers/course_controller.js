const { validationResult } = require('express-validator')
const CourseModel = require('../models/course_model')

// Get all course
exports.showcourse = async (req, res, next) => {
    try {
        const course = await CourseModel.find()
        const courseTranfromDate = await course.map((res) => {
            const dateTranform = (olddate) => {
                const date = new Date(olddate);
                return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
            }
            return {
                id: res.id,
                name: res.name,
                description: res.description,
                category: res.category,
                subject: res.subject,
                starttime: dateTranform(res.starttime),
                endtime: dateTranform(res.endtime),
                amount: res.amount
            }
        })
        res.status(200).json({
            course: courseTranfromDate,
            role: req.user.role
        })
    } catch (error) {
        next(error)
    }
}

// Creat course by instructor
exports.createcourse = async (req, res, next) => {
    try {
        const { name, description, category, subject, starttime, endtime, amount } = req.body
        const existCourse = await CourseModel.findOne({ name: name })
        const errorvalidation = validationResult(req)

        //Check validation from route
        if (!errorvalidation.isEmpty()) {
            const error = new Error('Invalid information')
            error.statusCode = 422
            error.validation = errorvalidation.array()
            throw error
        }
        //Check existCourse
        else if (existCourse) {
            error = new Error('This course already exists')
            error.statusCode = 400
            throw error
        }
        else {
            let course = new CourseModel({
                name: name,
                description: description,
                category: category,
                subject: subject,
                starttime: starttime,
                endtime: endtime,
                amount: amount
            })
            await course.save()
            res.status(201).json({
                message: 'Create course complete',
                data: course
            })
        }
    }
    catch (error) {
        next(error)
    }
}