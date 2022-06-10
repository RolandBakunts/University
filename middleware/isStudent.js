const { Forbidden } = require("../errorHandler/httpError");

async function isStudent(req, res, next) {
    const { role } = req.user;
    if (role !== 'student') {

        const error = new Forbidden('user is not a student')
        next(error, req, res, next);
    }
    next();
}
module.exports = isStudent;