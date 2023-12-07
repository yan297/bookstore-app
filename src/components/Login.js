import React, { useState } from 'react';

const Login = () => {
  const [loginData, setLoginData] = useState({
    userid: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 收集登录表单数据
    const formUserId = loginData.userid;
    const formPassword = loginData.password;
  
    // 构建登录数据对象
    const loginFormData = {
      userid: formUserId,
      password: formPassword,
    };
  
  
    try {
      // 发送POST请求到服务器
      const response = await fetch('http://localhost:4000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData), // 将登录数据转换为 JSON 格式并发送
      });
  
      // 检查是否收到服务器的成功响应
      if (response.ok) {
        const data = await response.json();
        console.log(data); // 打印服务器响应的数据到控制台
        // 这里可以根据服务器响应的数据执行其他操作
      } else {
        console.error('登录失败');
      }
    } catch (error) {
      console.error('请求错误:', error);
    }
  };
  

  return (
    <div>
      <h2>登录页面</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userid" placeholder="用户ID" onChange={handleChange} />
        <input type="password" name="password" placeholder="密码" onChange={handleChange} />
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default Login;
