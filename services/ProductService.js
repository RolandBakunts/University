const { NotFound, Forbidden } = require('../errorHandler/httpError');
const Product = require('../models/product');

async function getProduct(data) {
    if(!data){
        throw new Forbidden('no data provided')
    }
    const product = await Product.findOne(data);
    return product;
}
 
async function createProduct(data) {
    if(!data){
        throw new Forbidden('no data provided')
    }
    const product = await Product.create(data);
    return product;
}

async function deleteProduct(data) {
    if(!data){
        throw new Forbidden('no data provided')
    }
    const product = await Product.deleteOne(data);
    return product;
}
async function uptadeProduct({id, owner}, data) {
    const product = await Product.findOneAndUpdate({id, owner}, data);
    if (!product) {
        throw new NotFound('this user doesn\'t have such product')
    }
    return product;
}
module.exports = {
    getProduct,
    createProduct,
    deleteProduct,
    uptadeProduct
}