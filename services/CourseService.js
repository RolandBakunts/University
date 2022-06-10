const Course = require('../models/course');
const CourseRegistration = require('../models/courseRegistration');

const {NotFound, Unauthorized } = require('../errorHandler/httpError');

async function getCourse(data) {
    const {id, role} = data;
    if (role === 'teacher') {
        return await getTeacherCourse(id);
    }
    if (role === 'student') {
        return await getStudentCourse(id);
    }
    throw new Unauthorized('The logged in user is not student or teacher');
}

async function getTeacherCourse(id) {
    return await Course.find({teacher: id});
}

async function getStudentCourse(id) {
    return await CourseRegistration.find({student: id});
}


async function createCourse(data) {
    const {name , description} = data;
    if (!name && !description) {
        throw new NotFound()
    }
    const course = await Course.create(data);
    return course;
}
async function deleteCourse(id) {
    if(id === false){
        throw new NotFound()
    }
    const course = await Course.findOneAndDelete(id);
    return course;
}
async function updateCourse(id, body) {
    const { fieldsToUpdate } = body;
    if (fieldsToUpdate  === false) {
        throw new NotFound()
    }
    const course = await Course.findOneAndUpdate(id, body);
    return course;
}


module.exports = {
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
} 