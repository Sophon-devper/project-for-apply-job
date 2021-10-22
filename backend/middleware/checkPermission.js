module.exports.isInstructor = (req, res, next) => {
    try {
        const { role } = req.user
        if (role === 'instructor'){
            next();
        } else {
            const error  = new Error('Access not allowed. instructor only')
            error.statusCode = 403
            throw error
        }
    } catch(error) {
        next(error)
    }
}