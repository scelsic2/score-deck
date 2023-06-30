const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Course extends Model {}

Course.init({
  course_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
}
},{
  sequelize: db,
  modelName: 'course'
})

module.exports = Course