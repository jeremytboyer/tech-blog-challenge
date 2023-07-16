const { Model, DataTypes } = require('sequelize');
const db = require('../db/connection');

class Blog extends Model { }

Blog.init({
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
