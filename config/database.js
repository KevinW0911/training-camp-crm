const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/training_crm',
  {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: false  // 禁用SSL，因為Zeabur內部網絡不需要SSL
    }
  }
);

module.exports = sequelize;