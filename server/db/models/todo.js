const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {

    static associate({User}) {
      this.belongsTo(User, { foreignKey: 'Uid'});
    }
  }
  ToDo.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    Uid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ToDo',
  });
  return ToDo;
};
