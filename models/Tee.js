const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Tee extends Model {}

Tee.init({
  tee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{
  sequelize: db,
  modelName: 'tee'
})

module.exports = Tee