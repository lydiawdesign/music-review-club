const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// one to many
User.hasMany(Post, {
    foreignKey: 'userId',
    // onDelete: 'CASCADE'
});
// one to many
User.hasMany(Comment, {
    foreignKey: 'userId',
    // onDelete: 'CASCADE',
});
// one to one
Post.belongsTo(User, {
    foreignKey: 'userId'
});

// one to many
Post.hasMany(Comment, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

// one to one
Comment.belongsTo(User, {
    foreignKey: 'userId',
});

// one to one
Comment.belongsTo(Post, {
    foreignKey: 'postId',
});


module.exports = { User, Post, Comment };