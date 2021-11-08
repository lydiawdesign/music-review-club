// Dependencies
const router = require('express').Router();
const route = require('color-convert/route');
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');
// const formatDate = require('../utils/helpers');


// Render the home page (showing all reviews from all users)
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        attributes: ['id', 'artistName', 'songTitle', 'songTitle', 'genre', 'youtubeUrl', 'review', 'postTimestamp', 'userId'],
        include: [
            {
                model: User,
                attributes: ['realName', 'username']
            },
            {
                model: Comment,
                attributes: ['id', 'userId', 'comment', 'postId', 'commentTimestamp'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        console.log(posts);
        res.render('feed', {
           posts,
           loggedIn: req.session.loggedIn         
        })
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });   
});

// Render single review
router.get('/post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'artistName', 'songTitle', 'genre', 'youtubeUrl', 'review', 'postTimestamp', 'userId'],
        include: [
            {
            model: User,
            attributes: ['realName', 'username']
            },
            {
            model: Comment,
            attributes: ['id', 'userId', 'comment', 'postId', 'commentTimestamp'],
            include: {
                model: User,
                attributes: ['realName', 'username']
                }
            }
        ]   
    }).then (dbPostData => {
        const singlePost = dbPostData.get({ plain: true });
        console.log(singlePost);
        res.render('singlePost', {
            singlePost,
            loggedIn: req.session.loggedIn
        })
    })
});

router.get('/newpost', (req, res) => {
    res.render('newPost', {
        loggedIn: req.session.loggedIn
    });
});

// Render login screen
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }    
    res.render('login');
});

module.exports=router
