// Dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models')

// Render the home page
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'artistName',
            'songTitle',
            'songTitle',
            'genre',
            'youtubeUrl',
            'review',
            'post_timestamp',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'userId', 'comment', 'postId', 'comment'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', {
           posts,
           loggedIn: req.session.loggedIn         
        })
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });   
});



router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }    
    res.render('login');
});
