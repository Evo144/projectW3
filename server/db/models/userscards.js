'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userscard extends Model {

    static associate(models) {
      
    }
  }
  Userscard.init({
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Userscard',
  });
  return Userscard;
};