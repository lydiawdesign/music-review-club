// Dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Login an existing user (api/users/login)
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username} });
      if (!userData) {
        res.status(400)
            .json({ message: 'No matches, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
      console.log(validPassword);
      if (!validPassword) {
        res.status(400)
            .json({ message: 'No matches, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.loggedIn = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(500).json(err);
    }
});

// Add a new user (api/user)
router.post('/', (req, res) => {
    User.create({
        realName: req.body.realName,
        username: req.body.username,
        password: req.body.password
    })
    // Save the session and send back the data to front end
    .then(dbUserData => {
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.realName = dbUserData.realName;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// Log out user route (api/user/logout)
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
  
module.exports = router;