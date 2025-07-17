# 訓練營CRM系統

簡單的Node.js + Express + PostgreSQL 訓練營學員管理系統

## 功能特色

- 學員資料管理 (CRUD)
- PostgreSQL 資料庫
- RESTful API
- 支援Zeabur部署

## 本地開發

1. 安裝dependencies:
```bash
npm install
```

2. 設定環境變數 (.env):
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=training_crm
DB_USER=postgres
DB_PASSWORD=your_password
```

3. 啟動開發服務器:
```bash
npm run dev
```

## API端點

- `GET /api/health` - 健康檢查
- `GET /api/students` - 獲取所有學員
- `GET /api/students/:id` - 獲取單一學員
- `POST /api/students` - 新增學員
- `PUT /api/students/:id` - 更新學員
- `DELETE /api/students/:id` - 刪除學員

## Zeabur部署

1. 在專案根目錄已包含 `zeabur.json` 配置文件
2. 推送到GitHub
3. 在Zeabur控制台連接GitHub倉庫
4. 添加PostgreSQL服務
5. 設定環境變數
6. 部署完成

## 學員資料格式

```json
{
  "name": "學員姓名",
  "email": "email@example.com",
  "phone": "0912345678",
  "course": "課程名稱",
  "status": "active",
  "notes": "備註"
}
```