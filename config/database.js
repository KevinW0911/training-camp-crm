const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/training_crm',
  {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: process.env.NODE_ENV === 'production' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
);

module.exports = sequelize;