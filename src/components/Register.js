import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
    tel: '',
    country: '',
    province: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // 处理从服务器返回的响应
        console.log(data);
      })
      .catch((error) => {
        // 处理错误
        console.error('Error:', error);
      });
  };
  

  return (
    <div>
      <h2>注册页面</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userid" placeholder="用户ID" onChange={handleChange} />
        <input type="password" name="password" placeholder="密码" onChange={handleChange} />
        <input type="text" name="tel" placeholder="电话" onChange={handleChange} />
        <input type="text" name="country" placeholder="国家" onChange={handleChange} />
        <input type="text" name="province" placeholder="省份" onChange={handleChange} />
        <input type="text" name="city" placeholder="城市" onChange={handleChange} />
        <button type="submit">注册</button>
      </form>
    </div>
  );
};

export default Register;
