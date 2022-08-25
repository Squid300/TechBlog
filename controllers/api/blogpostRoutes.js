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
        const comments = postData.comment.get({ plain: true });

        res.render('post', {
            post,
            comments,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post( '/:id', async ( req, res ) => {
    const comment = await Comment.create({
        content: req.body.content,
        user_id: req.session.user_id,
        post_id: req.params.id,
    });
});

router.post('/create', async ( req, res ) => {
    try{
        const project = await Post.create({
           content: req.body.content,
           user_id: req.session.user_id, 
        });

        res.redirect(`/api/post/${project.id}`);
    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;