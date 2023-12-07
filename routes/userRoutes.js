// userRoutes.js

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const secretKey = '123456';

// 创建 PostgreSQL 数据库连接池
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bookstore', // 数据库名，这里使用你的数据库名
  password: '123456',
  port: 5432, // 默认 PostgreSQL 端口
});

// 用户注册的路由处理程序
router.post('/register', async (req, res) => {
  const { userid, password, email, country, province, city } = req.body;

  try {
    // 将用户信息插入到数据库中的 users 表中
    const insertQuery = `
      INSERT INTO users (userid, password, email, country, province, city)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [userid, password, email, country, province, city];
    await pool.query(insertQuery, values);

    res.status(200).json({ message: '用户注册成功！' });
  } catch (error) {
    res.status(500).json({ error: '注册失败，请重试！' });
  }
});

// 用户登录的路由处理程序
router.post('/login', async (req, res) => {
  const { userid, password } = req.body;

  try {
    // 在数据库中查找匹配的用户
    const query = 'SELECT * FROM users WHERE userid = $1 AND password = $2';
    const { rows } = await pool.query(query, [userid, password]);

    if (rows.length === 1) {
    
      const token = jwt.sign({ userid }, secretKey); // 更换成您自己的密钥

      res.status(200).json({ message: '用户登录成功！' ,token});
    } else {
      res.status(401).json({ error: '用户名或密码错误！' });
    }
  } catch (error) {
    res.status(500).json({ error: '登录失败，请重试！' });
  }
});

// 获取书籍列表的路由处理程序
router.get('/books', async (req, res) => {
  try {
    // 从数据库中获取书籍列表
    const query = 'SELECT * FROM books'; // 假设你有一个名为 books 的表来存储书籍信息
    const { rows } = await pool.query(query);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: '获取书籍列表失败！' });
  }
});
// 添加书籍的路由处理程序
router.post('/books/add', async (req, res) => {
  const { title, image, quantity, originalPrice, discountedPrice } = req.body;

  try {
    // 将书籍信息插入到数据库中的 books 表中
    const insertQuery = `
      INSERT INTO books (title, image, quantity, originalPrice, discountedPrice)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [title, image, quantity, originalPrice, discountedPrice];
    await pool.query(insertQuery, values);

    res.status(200).json({ message: '书籍添加成功！' });
  } catch (error) {
    res.status(500).json({ error: '添加书籍失败，请重试！' });
  }
});

router.get('/userInfo', async (req, res) => {
  //console.log('找到路由');
    const token = req.headers.authorization; // 获取请求头中的 token
    // 在这里进行对 token 的验证和解码
    // 从 token 中提取用户信息或用户 ID
    if (!token) {
      return res.status(401).json({ error: '没有提供 Token！' });
    }
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
      //console.log(decoded);
      const userid = decoded.userid; 
      //console.log(userid);
    // 根据用户 ID 从数据库中查询用户信息
    const query = 'SELECT * FROM users WHERE userid = $1';
    const { rows } = await pool.query(query, [userid]);

    if (rows.length === 1) {
      const userData = rows[0];
      res.status(200).json(userData);
    } else {
      res.status(404).json({ error: '未找到用户信息！' });
    }
  } catch (error) {
    res.status(500).json({ error: '获取用户信息失败！' });
  }

});

router.put('/updateUserInfo', async (req, res) => {
  // 从请求中获取更新的用户信息数据
  const { userid, email, country, province, city } = req.body;

  try {
    // 在数据库中更新用户信息的逻辑
    const updateQuery = 'UPDATE users SET email = $1, country = $2, province = $3, city = $4 WHERE userid = $5';
    const values = [email, country, province, city, userid];
    await pool.query(updateQuery, values);

    // 更新成功，向前端发送成功消息
    res.status(200).json({ message: '用户信息更新成功！' });
  } catch (error) {
    // 处理更新失败的情况
    res.status(500).json({ error: '更新用户信息失败！' });
  }
});

router.put('/updatePassword', async (req, res) => {
  const { userid, password, newPassword, confirmPassword } = req.body;

  try {
    // 从数据库中获取旧密码
    const query = 'SELECT password FROM users WHERE userid = $1';
    //console.log(userid);
    const { rows } = await pool.query(query, [userid]);
    //console.log(rows);
    if (rows.length === 1) {
      const savedPassword = rows[0].password;
      //console.log(savedPassword);
      // 检查旧密码是否匹配数据库中存储的密码
      if (password !== savedPassword) {
        return res.status(400).json({ error: '旧密码不正确！' });
      }
      //console.log(newPassword);
      //console.log(userid);
      // 检查新密码和确认密码是否匹配
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: '新密码和确认密码不匹配！' });
      }
      
      // 更新数据库中的密码为新密码
      const updateQuery = 'UPDATE users SET password = $1 WHERE userid = $2';

      await pool.query(updateQuery, [newPassword, userid]);

      res.status(200).json({ message: '密码更新成功！' });
    } else {
      res.status(404).json({ error: '用户不存在！' });
    }
  } catch (error) {
    res.status(500).json({ error: '更新密码失败！' });
  }
});

// 处理添加到购物车的 POST 请求
router.post('/addcart', async (req, res) => {
  try {
    const { bookId } = req.body;
    const token = req.headers.authorization.split(' ')[1]; // 从请求头中获取 token
    const decodedToken = jwt.verify(token, '123456'); // 解码和验证 token
    const userId = decodedToken.userid; // 从解码后的 token 中获取用户 ID
    const quantity = 1; // 默认每次加入购物车数量为1，你可以根据需求修改

    //console.log(userId);
    //console.log(bookId);
    //console.log(quantity);

    // 将书籍信息和用户信息保存到数据库中的购物车表中
    // 这里假设你有一个名为 cart 的数据库表来存储购物车信息
    // 你需要使用适合你数据库的方式将书籍信息和用户信息存储到购物车表中
    const insertQuery = `
      INSERT INTO cart (user_id, book_id, quantity)
      VALUES ($1, $2, $3)
    `;
    const values = [userId, bookId, quantity];
    await pool.query(insertQuery, values);

    console.log('Book added to cart successfully');
    res.status(200).json({ message: 'Book added to cart successfully' });
  } catch (error) {
    console.error('Error adding book to cart:', error);
    res.status(500).json({ message: 'Error adding book to cart' });
  }
});


// 获取购物车项目
router.get('/cartItems', async (req, res) => {
  const token = req.headers.authorization; // 从请求头中获取 token
  
  try {
    const decodedToken = jwt.verify(token, '123456'); // 解码和验证 token
    console.log(decodedToken);
    const userid = decodedToken.userid; // 从解码后的 token 中获取用户 ID
    
    const query = `
      SELECT cart.id, cart.book_id AS bookId, cart.quantity, books.title, books.image, books.originalprice, books.discountedprice
      FROM cart
      INNER JOIN books ON cart.book_id = books.id
      WHERE cart.user_id = $1
    `;
    const { rows } = await pool.query(query, [userid]);
    res.status(200).json({ cartItems: rows });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart items' });
  }
});


// 获取单个书籍信息
router.get('/books/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    const query = 'SELECT * FROM books WHERE id = $1';
    const { rows } = await pool.query(query, [bookId]);
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book information' });
  }
});

module.exports = router;
