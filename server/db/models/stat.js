'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    static associate({ User }) {
        this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Stat.init(
    {
      points: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Stat',
    }
  );
  return Stat;
};