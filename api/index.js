const router = require('express').Router();

router.use('/user', require('./user/UserController'));
router.use('/product', require('./product/ProductController'));
router.use('/course', require('./course/CourseController'));


module.exports = router;