'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate({ User, Userscard }) {
      this.belongsToMany(User, {
        through: Userscard,
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
