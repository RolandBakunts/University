const { HttpError } = require("../errorHandler/httpError")

function ErrorHandler(error, req, res, next) {
    console.log(error.message);
    if (error && error instanceof HttpError) {
        return res.status(error.status).send(error.message);
    }
    return res.status(500).send({msg:'internal error'})
}

module.exports = ErrorHandler