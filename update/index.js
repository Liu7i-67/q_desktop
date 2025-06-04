// server.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 9071;
const PUBLIC_DIR = path.join(__dirname, 'public');

// 托管静态文件
app.use(express.static(PUBLIC_DIR));

// 启动服务器
app.listen(PORT, () => {
  console.log(`✅ 静态服务器运行在 http://localhost:${PORT}`);
});
