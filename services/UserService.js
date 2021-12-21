
const User = require('../models/user');
const CourseRegistration = require('../models/courseRegistration');
const Course = require('../models/course');

const { Unauthorized, Forbidden, NotFound } = require('../errorHandler/httpError');
const { sendEmailConfirmation } = require('./MailingService');
const config = require('../config');

const jwt = require('jsonwebtoken');
const req = require('express/lib/request');

const { jwtSecret } = config;


async function email_confirmation(token, { _id, emailConfirmationToken }) {
    const decodedToken = jwt.verify(token, jwtSecret);
    const { id } = decodedToken;
    const result = (id === _id) && (token === emailConfirmationToken);
    if (result) {
        await User.updateOne({ _id }, { emailConfirmed: true, emailConfirmationToken: '' });
        return;
    }
    throw new Unauthorized('Invalid token');
}

async function signup(data) {
    data.emailConfirmed = false;
    const user = await User.create(data);
    console.log(user);
    const token = jwt.sign({ id: user._id },
        jwtSecret, { expiresIn: '3d' });
    await User.findOneAndUpdate({ _id: user._id }, { emailConfirmationToken: token })
    await sendEmailConfirmation(user.email, token);
    console.log(token)
    return user;
}

async function login(data) {
    const user = await User.findOne(data);
    if (!user) throw new Unauthorized("wrong email or password");
    if (!user.emailConfirmed === false) throw new Forbidden("please confirm your email");
    const { id } = user;
    const token = jwt.sign({ id }, jwtSecret, { expiresIn: '3h' });
    return token;
}
async function deleteRegistration(role, data) {
    if (role === 'teacher') {
        return deleteRegistrationTeacher(data);
    }
    if (role === 'student') {
        return deleteRegistrationStudent(data);
    }
    throw Unauthorized('user cannot delete')
}
async function deleteRegistrationTeacher(data) {

    const { userId, studentId, courseId } = data;
    const course = await Course.findOne({ _id: courseId });
    if (course.teacher !== userId) {
        throw Forbidden('not course')
    }
    await CourseRegistration.findOneAndDelete({ studentId, courseId });
    return;
}
async function deleteRegistrationStudent(data) {
    const { studentId, courseId } = data;
    await CourseRegistration.findOneAndDelete({ studentId, courseId });
    return;
}

module.exports = {
    signup,
    login,
    email_confirmation,
    deleteRegistration
}