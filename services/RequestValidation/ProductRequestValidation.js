const Joi = require('joi');
const { BadRequest } = require('../../errorHandler/httpError');

function getProduct(input) {
    const schema = Joi.object({
        id: Joi.string() 
            .required(),
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}
function deleteProduct(input) {
    const schema = Joi.object({
        id: Joi.string() 
            .required(),
    })
    if (!schema.validate(input)) {
        throw new BadRequest(result.error);
    };
    return;
}
function uptadeProduct(params,body){
    const schema = Joi.object({
        id: Joi.string() 
            .required(),
    })
    if (!schema.validate(params)) {
        throw new BadRequest(result.error);
    };
    const schema2 = Joi.object({
            name: Joi.string()
            .alphanum()
            .min(3)
            .max(30),
            price: Joi.number()     
    })
    if(!schema2.validate(body)){
        throw new BadRequest(result.error);
    };
    return;
}

function createProduct(input){
    const schema = Joi.object({
            name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
            price: Joi.number()   
            .required(),
    })
    if(!schema.validate(input)){
        throw new BadRequest(result.error);
    };
    return;
}


module.exports = {
    deleteProduct,
    uptadeProduct,
    createProduct,
    getProduct
}