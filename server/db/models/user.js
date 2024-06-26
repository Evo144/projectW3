'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Card, Userscard, Stat }) { 
      this.belongsToMany(Card, {
        through: Userscard,
        foreignKey: 'userId',
      })
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
