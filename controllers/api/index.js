const router = require('express').Router();
const postRoutes = require('./blogpostRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);

module.exports = router;