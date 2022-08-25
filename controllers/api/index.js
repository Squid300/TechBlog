const router = require('express').Router();
const postRoutes = require('./blogpostRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/user', userRoutes);
router.use('posts', postRoutes);

module.exports = router;