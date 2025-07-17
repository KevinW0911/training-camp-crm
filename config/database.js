const { Sequelize } = require('sequelize');

// 解析DATABASE_URL或使用默認配置
let sequelize;

if (process.env.DATABASE_URL) {
  // 使用DATABASE_URL（生產環境）
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
} else {
  // 使用個別環境變數（開發環境）
  sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'training_crm',
    username: 'postgres',
    password: 'password',
    logging: console.log
  });
}

module.exports = sequelize;