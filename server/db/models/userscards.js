'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userscards extends Model {

    static associate(models) {
      
    }
  }
  Userscards.init({
    userId: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Userscards',
  });
  return Userscards;
};