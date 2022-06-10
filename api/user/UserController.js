const router = require('express').Router();
const config = require('../../config');
const UserService = require('../../services/UserService');
const { NotFound } = require('../../errorHandler/httpError');
const { signup: signupValidation,
    login: loginValidation,
    updateGrade: updateGradeValidation,
    studentRegisteration: studentRegisterationValidation,
    deleteRegistration: deleteRegistrationValidation } = require('../../services/RequestValidation/UserRequestValidation');

const isStudent = require("../../middleware/isStudent");
const isTeacher = require("../../middleware/isTeacher");

const verify = require("../../middleware/authorization");
const CourseRegistration = require(`../../models/courseRegistration`);

router.post('/signup', signup);
router.post('/login', login);
router.put('/studentRegisteration', [verify, isStudent], studentRegisteration);
router.post('/updateGrade/:id', [verify, isTeacher], updateGrade);
router.delete('/deleteRegistration', [verify], deleteRegistration);


const { jwtSecret } = config;

async function signup(req, res, next) {
    try {
        signupValidation(req.body);
        const { username, email, password, role } = req.body;
        const user = await UserService.signup({ username: username, email: email, password: password, role: role });
        return res.status(201).send(user);
    }
    catch (error) {
        next(error, req, res, next);
    }
}


async function login(req, res, next) {
    try {
        loginValidation(req.body);
        const { email, password } = req.body;
        const token = await UserService.login({ email, password });
        if (!token) {
            throw new NotFound("user not found");
        }
        res.status(200).json({ token });
    } catch (error) {
        next(error, req, res, next);
    }
}

async function studentRegisteration(req, res, next) {
    try {
        studentRegisterationValidation(req.body);
        const { id: studentId } = req.user;
        const { courseId } = req.body;
        const registration = await CourseRegistration.create({ student: studentId, course: courseId });
        res.status(200).json({ registration });
    } catch (error) {
        next(error, req, res, next);
    }
}

async function updateGrade(req, res, next) {
    try {
        updateGradeValidation(req.body);
        const { grade, courseId, studentId } = req.body;
        const update = await CourseRegistration.findOneAndUpdate({ student: studentId, course: courseId }, { grade })
        res.status(200).json({ update });
    } catch (error) {

        next(error, req, res, next)
    }
}

async function deleteRegistration(req, res, next) {
    try {
        const { id, role } = req.user;
        const { courseId } = req.body;
        const studentId = role === 'student' ? req.user.id : req.body.studentId;

        const deleteReg = await UserService.deleteRegistration(role, { id, courseId, studentId });
        res.status(200).json({ deleteReg });
    } catch (error) {
        next(error, req, res, next)
    }
}




module.exports = router;



// async function email_confirmation(req, res, next) {
//     try {
//         email_confirmationValidation(req.params);
//         const { token } = req.params;
//         const { emailConfirmationToken, _id  } = req.user;
//         await UserService.email_confirmation(token, {_id, emailConfirmationToken});
//         res.status(200).send({ msg: "email is confirmed" });
//     }
//     catch (error) {
//         next(error, req, res, next);
//     }
// }