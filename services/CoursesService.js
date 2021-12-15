const { NotFound } = require('../errorHandler/httpError');
const CoursesService = require('../../services/CoursesService');

async function getCourses(data) {
    const courses = await CoursesService.findOne(data);
    return courses;
}
 
module.exports={
    getCourses
}