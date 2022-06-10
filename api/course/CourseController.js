const router = require('express').Router();

const isTeacher = require("../../middleware/isTeacher");
const verify = require("../../middleware/authorization");

const CourseService = require('../../services/CourseService');
const { getCourse: getCourseValidation, createCourse: createCourseValidation, updateCourse: updateCourseValidation, deleteCourse: deleteCourseValidation } = require('../../services/RequestValidation/CourseRequestValidation');


router.get('/', verify, getCourse);
router.put('/', [verify, isTeacher], createCourse);
router.post('/:id', [verify, isTeacher], updateCourse);
router.delete('/:id', [verify, isTeacher], deleteCourse);

async function getCourse(req, res, next) {
    try {
        const { id, role } = req.user;
        const getcourse = await CourseService.getCourse({ id, role });
        return res.status(200).json({ getcourse });
    } catch (error) {
        next(error, req, res, next);
    }
}
async function createCourse(req, res, next) {
    try {
        createCourseValidation(req.body);
        const { id } = req.user;
        const { name, description } = req.body;
        const createcourse = await CourseService.createCourse({ name, description, teacher: id });
        res.status(201).json({ id: createcourse.id });
    } catch (error) {
        next(error, req, res, next);
    }
}
async function updateCourse(req, res, next) {
    try {
        updateCourseValidation(req.body);
        const { id } = req.user;
        const { id: courseId } = req.params;
        const { fieldsToUpdate } = req.body;
        const updatedcourse = await CourseService.updateCourse({ _id: courseId, teacher: id }, fieldsToUpdate);
        res.status(200).json({ updatedcourse });
    } catch (error) {
        next(error, req, res, next);
    }
}
async function deleteCourse(req, res, next) {
    try {
        deleteCourseValidation(req.user);
        deleteCourseValidation(req.params);
        const { id } = req.user;
        const { id: courseId } = req.params;
        const deletedCourse = await CourseService.deleteCourse({ _id: courseId, teacher: id });
        res.status(200).json({ deletedCourse });
    } catch (error) {
        next(error, req, res, next);
    }
}


module.exports = router;