const Joi = require('joi');
const { BadRequest } = require('../../errorHandler/httpError');

function email_confirmation(params) {
    const schema = Joi.object({
        token: Joi.string()
            .required(),
    })
    if (!schema.validate(params)) {
        throw new BadRequest(result.error);
    };
    return;
}


function login(input) {
    const schema = Joi.object({

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),


        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}

function signup(input) {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}
function updateGrade(input) {
    const schema = Joi.object({
        grade: Joi.number()
            .required(),
        courseId: Joi.string()
            .required(),
        studentId: Joi.string()
            .required(),
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}
function studentRegisteration(input) {
    const schema = Joi.object({
        courseId: Joi.string()
            .required(),
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}

function deleteRegistration(input) {
    const schema = Joi.object({
        courseId: Joi.string()
            .required(),
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}
module.exports = {
    email_confirmation,
    login,
    signup,
    updateGrade,
    studentRegisteration,
    deleteRegistration
}