const router = require('express').Router();

router.use('/user', require('./user/UserController'));
router.use('/product', require('./product/ProductController'));
router.use('/courses', require('./courses/CoursesController'));


module.exports = router;