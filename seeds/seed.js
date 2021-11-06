const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userdata = require('./user.json');
const postdata = require('./post.json');
const commentdata = require('./comment.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
  });
  const posts = await Post.bulkCreate(postdata, {
    individualHooks: true,
    returning: true,
  });
  const comments = await Comment.bulkCreate(commentdata, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();