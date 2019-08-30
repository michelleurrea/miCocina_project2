'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    name: DataTypes.STRING,
    serving: DataTypes.INTEGER,
    url: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  favorite.associate = function(models) {
    models.favorite.belongsToMany(models.user, { through: 'usersFavorites' })
  };
  return favorite;
};