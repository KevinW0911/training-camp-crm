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
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
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
  const maxRetries = 10;
  const retryDelay = 5000; // 5秒
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`嘗試連接資料庫 (${i + 1}/${maxRetries})...`);
      await sequelize.authenticate();
      console.log('資料庫連接成功');
      
      await sequelize.sync({ force: false });
      console.log('資料表同步完成');
      
      return; // 成功後退出
    } catch (error) {
      console.error(`資料庫連接失敗 (嘗試 ${i + 1}/${maxRetries}):`, error.message);
      
      if (i === maxRetries - 1) {
        console.error('資料庫初始化最終失敗');
        process.exit(1);
      }
      
      console.log(`等待 ${retryDelay/1000} 秒後重試...`);
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
}

// 啟動應用程式
async function startApp() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('訓練營CRM系統已啟動，資料庫已自動初始化');
  });
}

startApp();