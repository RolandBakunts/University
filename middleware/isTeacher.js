const { Forbidden } = require("../errorHandler/httpError");

async function isTeacher(req, res, next) {
    const {role} = req.user;
     if(role !== 'teacher'){
         
        const error  = new Forbidden('user is not a teacher') 
        next(error, req, res, next);
     }
     next();
}
module.exports = isTeacher;