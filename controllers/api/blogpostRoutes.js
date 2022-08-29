const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

router.get( '/:id', async ( req, res ) => {
    try {
        const postData = await Post.findByPk( req.params.id, {
            include: [{
                model: User,
                attributes: [
                    'username'
                ],
            },
            {
                model: Comment,
            }],
        });
        const post = postData.get({ plain: true});

        res.render('post', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/create', async ( req, res ) => {
    try{
        const title = req.body.title;
        const content = req.body.content;
        const user = req.session.user_id;

        const newPost = await Post.create({ title: title, content: content, user_id: user });

        res.status(200).redirect('/api/user/profile');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/comment', async ( req, res ) => {
    try{
        const comment = req.body.comment;
        const postId = req.body.id;

        const newComment = Comment.create({ content: comment, user_id: req.session.user_id, post_id: postId });

        res.status(200).redirect(`/api/post/${postId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;