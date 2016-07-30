'use strict';
module.exports = function(sequelize, DataTypes) {
  var photo = sequelize.define('photo', {
    author: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return photo;
};