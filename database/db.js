// config/db.js

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'bookstore',
  password: '123456',
  port: 5432, // 默认 PostgreSQL 端口
});

// 导出数据库连接实例
module.exports = pool;
