const Courses = require('../../models/courses');
const isTeacher = require("../../middleware/isTeacher");
const router = require('express').Router();
const { NotFound, MethodNotAllowed, InternalServerError } = require('../../errorHandler/httpError');
const verify = require("../../middleware/authorization");


router.get('/:id', getCourses);
router.put('/', [verify, isTeacher], createCourses);
router.post('/:id', [verify, isTeacher], updateCourses);

async function createCourses(req, res, next) {
    try {
        const { id } = req.user;
        const { name, student_grades, description } = req.body;
        const create = await Courses.create({ name, student_grades, description, teacher: id });
        res.status(201).json({ create });
    } catch (error) {
        next(error, req, res, next);
    }
}
async function updateCourses(req, res, next) {
    try {
        const { id } = req.user;
        const { id: coursesId } = req.params;
        const { fieldsToUpdate } = req.body;
        const updatedCourse = await Courses.findOneAndUpdate({ id: coursesId ,teacher: id },fieldsToUpdate);
        res.status(200).json({ updatedCourse });
    } catch (error) {
        next(error, req, res, next);
    }
}

async function getCourses(req, res, next) {
    try {
        const { id: coursesId } = req.params;
        const courses = await CoursesService.getCourses({ id: coursesId });
        if (courses) {
            return res.status(200).json({ courses });
        }
        throw new NotFound();
    } catch (error) {
        next(error, req, res, next);
    }
}

module.exports = router;