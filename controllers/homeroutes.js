// Dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

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
router.get('post/:id', (req,res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'artistName', 'songTitle', 'songTitle', 'genre', 'youtubeUrl', 'review', 'post_timestamp', 'userId'],
        include: [
            {
            model: User,
            attributes: ['realName' , 'username']
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
    }).then (dpPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('single-post', {
            posts,
            loggedIn: req.session.loggedIn
            // loggedIn: false
        })
    })
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
