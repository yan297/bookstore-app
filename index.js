// app.js 或 index.js

const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes'); // userRoutes 文件路径

app.use(cors()); // 使用 CORS 中间件解决跨域问题

// 使用 body-parser 中间件来解析 POST 请求中的表单数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 将用户路由绑定到指定路径
app.use('/users', userRoutes); // 这里填写你想要的路由路径，比如 '/users'

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
