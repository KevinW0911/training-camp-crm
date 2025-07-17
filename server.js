const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: '訓練營CRM系統運行中' });
});

// 新增資料庫初始化API端點
app.post('/api/init-db', async (req, res) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    res.json({ 
      status: 'success', 
      message: '資料庫初始化成功，資料表已創建' 
    });
  } catch (error) {
    console.error('資料庫初始化失敗:', error);
    res.status(500).json({ 
      status: 'error', 
      message: '資料庫初始化失敗', 
      error: error.message 
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