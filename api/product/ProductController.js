const router = require('express').Router();
const { NotFound, MethodNotAllowed, InternalServerError } = require('../../errorHandler/httpError');
const verify = require("../../middleware/authorization");
const ProductService = require('../../services/ProductService');
const { getProduct: getProductValidation, createProduct: createProductValidation, uptadeProduct: uptadeProductValidation, deleteProduct: deleteProductValidation } = require('../../services/RequestValidation/UserRequestValidation');


router.get('/:id', getProduct);
router.put('/', verify, createProduct);
router.delete('/:id', verify, deleteProduct);
router.post('/:id', verify, uptadeProduct);

async function getProduct(req, res, next) {
    try {
        getProductValidation(req.params)
        const { id: productId } = req.params;

        const product = await ProductService.getProduct({ id: productId });
        if (product) {
            return res.status(200).json({ product });
        }
        throw new NotFound();
    } catch (error) {
        next(error, req, res, next);
    }
}

async function createProduct(req, res, next) {
    try {
        createProductValidation(req.body)
        const { id } = req.user;
        const { name, price } = req.body;
        if (!name && !price) {
            throw new Forbidden()
        }
        const newProduct = await ProductService.createProduct({ name, price, owner: id });
        return res.status(200).json({ msg: 'product created', product: newProduct.id });
    } catch (error) {
        next(error, req, res, next);
    }
}



async function deleteProduct(req, res, next) {
    try {
        deleteProductValidation(req.params)
        const { id: productId } = req.params;
        const { id: userId } = req.user;

        const product = await ProductService.getProduct({ id: productId });
        if (!product) {
            throw new NotFound();
        }
        if (product.owner !== userId) {
            throw new MethodNotAllowed("user cannot delete products")
        }
        await ProductService.deleteProduct({ id: productId, owner: userId });
        return res.status(200).json({ msg: "product deleted" })
    } catch (error) {
        next(error, req, res, next);
    }
}

async function uptadeProduct(req, res, next) {
    try {
        deleteProductValidation(req.params);
        uptadeProductValidation(req.body);
        const { id: productId } = req.params;
        const { id: userId } = req.user;
        const { fieldsToUpdate } = req.body;
        if (!fieldsToUpdate) {
            throw new NotFound("user doesnt own such a product")
        }
        const updatedProduct = await ProductService.uptadeProduct({
            id: productId, owner: userId
        }, fieldsToUpdate);
        if (updatedProduct) {
            return res.status(200).json({ msg: "product updated", updatedProduct })
        }
    } catch (error) {
        next(error, req, res, next);

    }
}

module.exports = router;