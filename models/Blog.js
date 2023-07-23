const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');

class Blog extends Model { }

Blog.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 3
    }
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 3
    }
  }
}, {
  sequelize: db,
  modelName: 'Blog'
});

module.exports = Blog;
