const Joi = require('joi');
const { BadRequest } = require('../../errorHandler/httpError');


function createCourse(input) {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        description: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        student_grades: [
            Joi.string()
        ],
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}

function updateCourse(input) {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        description: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        student_grades: [
            Joi.string()
        ],
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}
function deleteCourse(input) {
    const schema = Joi.object({
        id: Joi.string()
            .required(),
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}

module.exports = {
    createCourse,
    updateCourse,
    deleteCourse
}
