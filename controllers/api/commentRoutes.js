// Dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Add a comment
router.post('/', withAuth, (req, res) => {
    console.log(req.session);
    if (req.session) {
        Comment.create({
            comment: req.body.comment,
            postId: req.body.postId,
            userId: req.session.userId
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    };
});

module.exports = router;