const router = require('express').Router();
const config = require('../../config');
const UserService = require('../../services/UserService');
const { Forbidden, Unauthorized, NotFound } = require('../../errorHandler/httpError');
const { email_confirmation: email_confirmationValidation, signup: signupValidation, login: loginValidation } = require('../../services/RequestValidation/UserRequestValidation');

router.post('/signup', signup);
router.post('/login', login);
// router.get('/email-confirmation/:token', email_confirmation)

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