const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.post( '/login', async ( req, res ) => {
    try {
        const response = req;
        const userData = await User.findOne({ where: { email: req.body.email }});

        if(!userData){
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword){
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
        }

        req.session.save(() =>{
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    }catch (err) {
        res.status(500).json(err);
    }
});

router.post('/create', async ( req, res ) => {
    try{
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData)
        });
    }catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/profile', async ( req, res ) => {
    try{
        const userData = await User.findByPk( req.session.user_id, {
            attributes: [
                'username',
                'email',
            ]
        });
        const postData = await Post.findAll({ where: { user_id: req.session.user_id }});
        const commentData = await Comment.findAll({ where: { user_id: req.session.user_id }});

        res.render('profile', {
            userData,
            postData,
            commentData,
            loggedIn: req.session.loggedIn,
        });
    }catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;