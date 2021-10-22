const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const UsersModel = require('../models/users_model')

// user register 
exports.register = async (req, res, next) => {
    try {
        const { username, password, firstname, lastname, nickname, birthday, gender, role } = req.body
        const existEmail = await UsersModel.findOne({ username: username })     //find existEmail from database
        const errorvalidation = validationResult(req)                           // error from route

        // Check validation from route
        if (!errorvalidation.isEmpty()) {
            const error = new Error('Invalid information')
            error.statusCode = 422
            error.validation = errorvalidation.array()          // Keep all error validation to show 
            throw error
        }
        // Check existEmail
        else if (existEmail) {
            error = new Error('This email already exists')
            error.statusCode = 400
            throw error
        }
        else {
            // Save data for register
            let user = new UsersModel()
            user.username = username
            user.password = await user.encryptPassword(password)
            user.firstname = firstname
            user.lastname = lastname
            user.nickname = nickname
            user.birthday = birthday
            user.gender = gender
            user.role = role
            await user.save()

            res.status(201).json({
                message: "You have successfully registered",
                data: {
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    nickname: nickname,
                    role: role
                }
            })
        }
    }
    catch (error) {
        next(error)
    }
}


// user login
exports.login = async (req, res, next) => {
    try {
        // Verify the user account to log in.
        const { username, password } = req.body
        const user = await UsersModel.findOne({ username: username })
        const errorvalidation = validationResult(req)                           // error from route

        // Check validation from route
        if (!errorvalidation.isEmpty()) {
            const error = new Error('Invalid information')
            error.statusCode = 422
            error.validation = errorvalidation.array()          // Keep all error validation to show 
            throw error
        }

        // Check account
        // user not found
        if (!user) {
            error = new Error('User account not found')
            error.statusCode = 404
            throw error
        }
        // user found
        else {
            //check password
            const isValid = await user.checkPassword(password)
            if (!isValid) {
                error = new Error('Incorrect password')
                error.statusCode = 401
                throw error
            }
            // password correct
            // login systems
            // create (encoded) a token to verify your login.
            else {
                const token = await jwt.sign({
                    id: user.id,
                    role: user.role
                }, config.JWT_SECRET, { expiresIn: '1h' })

                // (decoded) for get expires 
                const payload = jwt.decode(token)

                // login success
                res.status(200).json({
                    access_token: token,
                    role: payload.role,
                    expires_in: payload.exp,  // get expires
                    token_type: 'Bearer'
                })
            }
        }
    }
    catch (error) {
        next(error)
    }
}

// get profile
exports.profile = async (req, res, next) => {
    try {
        const { firstname, lastname, username, nickname, birthday, gender, role } = req.user   //from done(user) in passportJwt middleware
        const dateTranform = (olddate) => {
            const date = new Date(olddate);
            return (`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)
        }
        res.status(200).json({
            firstname: firstname,
            lastname: lastname,
            username: username,
            nickname: nickname,
            birthday: dateTranform(birthday),
            gender: gender,
            role: role
        })
    }
    catch (error) {
        next(error)
    }
}

// update profile
exports.update = async (req, res, next) => {
    try {
        const { id } = req.user
        const { firstname, lastname, nickname, birthday, gender, role } = req.body
        const errorvalidation = validationResult(req)                           // error from route

        // Check validation from route
        if (!errorvalidation.isEmpty()) {
            const error = new Error('Invalid information')
            error.statusCode = 422
            error.validation = errorvalidation.array()          // Keep all error validation to show 
            throw error
        }

        // Update user
        const userUpdate = await UsersModel.updateOne({ _id: id },
            {
                firstname: firstname,
                lastname: lastname,
                nickname: nickname,
                birthday: birthday,
                gender: gender,
                role: role
            }
        )

        if (userUpdate.nModified === 0) throw new Error('Update not found')
        else res.status(200).json({ message: 'Update data complete' })
    }
    catch (error) {
        next(error)
    }
}