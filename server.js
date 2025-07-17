const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/students', studentRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '訓練營CRM系統運行中' });
});

// 新增資料庫初始化API端點
app.get('/api/init-db', async (req, res) => {
  try {
    console.log('開始初始化資料庫...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '已設定' : '未設定');
    
    await sequelize.authenticate();
    console.log('資料庫連接成功');
    
    await sequelize.sync({ force: false });
    console.log('資料表同步完成');
    
    res.json({ 
      status: 'success', 
      message: '資料庫初始化成功，資料表已創建' 
    });
  } catch (error) {
    console.error('資料庫初始化失敗:', error);
    res.status(500).json({ 
      status: 'error', 
      message: '資料庫初始化失敗', 
      error: error.message,
      details: error.stack
    });
  }
});

// 初始化資料庫
async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('資料庫連接成功');
    
    await sequelize.sync({ force: false });
    console.log('資料表同步完成');
  } catch (error) {
    console.error('資料庫連接失敗:', error);
  }
}

initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});