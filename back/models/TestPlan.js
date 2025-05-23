const { Sequelize, sequelize } = require('./database');

class TestPlan extends Sequelize.Model {}

TestPlan.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(200),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'start_date'
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    field: 'end_date'
  },
  testCount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  progress: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'TestPlan',
  tableName: 'test_plans',
  timestamps: false
});

module.exports = TestPlan;
