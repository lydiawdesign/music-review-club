// Dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create a new review
router.post('/', withAuth, (req,res) => {
    Post.create({
        artistName: req.body.artistName,
        songTitle: req.body.songTitle,
        genre: req.body.genre,
        youtubeUrl: req.body.youtubeUrl,
        review: req.body.review,
        userId: req.session.userId
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;