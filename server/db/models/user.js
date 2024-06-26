'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Card, Userscards, Stat }) { 
      this.belongsToMany(Card, {
        through: Userscards,
        foreignKey: 'userId',
      });
      this.hasOne(Stat, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
