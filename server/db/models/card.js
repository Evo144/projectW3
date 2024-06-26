'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate({ User, Userscards }) {
      this.belongsToMany(User, {
        through: Userscards,
        foreignKey: 'cardId',
      });     
    }
  }
  Card.init(
    {
      category: DataTypes.STRING,
      word: DataTypes.STRING,
      translate: DataTypes.STRING,
      difficulty: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Card',
    }
  );
  return Card;
};