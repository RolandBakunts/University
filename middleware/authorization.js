const User = require("../models/user");
const config = require('../config');
const jwt = require('jsonwebtoken');
const {Unauthorized}= require("../errorHandler/httpError")



const { jwtSecret } = config;

async function verify(req, res, next) {
    try {
        const bearer = req.headers.authorization
        if (!bearer) {
            throw new Unauthorized('bearer token is not provided');
        }
        const token = bearer.split(' ')[1];

        const verify = jwt.verify(token, jwtSecret)
        const {id} = verify;
        const user = await User.findOne({ _id: id });
        req.user = user;
        next();
    } 
    catch (error) {
         next(error, req, res, next);
    }
}

module.exports = verify