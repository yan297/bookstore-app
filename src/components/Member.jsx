import React, { useEffect, useState } from 'react';
import './css/index.css'; 
import './css/member.css'; 

const Member = () => {
  const [userData, setUserData] = useState({
    userid: '',
    password: '',
    email: '',
    country: '',
    province: '',
    city: '',
  });

  const [passwords, setPasswords] = useState({
    userid: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // 获取用户信息的逻辑
    // 发送请求到后端获取用户信息并更新state中的数据
    const token = localStorage.getItem('token');
    //console.log(token);
    fetch('http://localhost:4000/users/userInfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 如果需要认证的话，也可以加上登录后的认证 token
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data); // 设置用户数据到state中
        //console.log(userData);
        setPasswords(data);
        //console.log(passwords);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 提交修改后的用户信息到后端
    fetch('http://localhost:4000/users/updateUserInfo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData), // 提交修改后的用户数据
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message); // store the message from the backend
        console.log('Updated User Data:', data);
        // 更新成功后的操作...
      })
      .catch((error) => {
        setMessage('Error updating user data'); // store an error message
        console.error('Error updating user data:', error);
        // 错误处理...
      });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 提交密码修改请求到后端
    fetch('http://localhost:4000/users/updatePassword', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwords),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Password updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating password:', error);
      });
  };


  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordInputChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  // render a message to the user if it exists
  const renderMessage = () => {
    if (message) {
      return <div>{message}</div>;
      // You can use this message to show an alert, modal, or in any other way you prefer
    }
    return null;
  };

  return (
<div className="user-info-container">
        <div className="section-title">个人信息</div>
      <div className="user-info-main">
        <form onSubmit={handleFormSubmit}>
          <p>
            <span className="nice">用户名：</span>
            <span>{userData.userid}</span>
          </p>
          <p>
            <span className="nice">邮箱：</span>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <span className="nice">国家：</span>
            <input
              type="text"
              name="country"
              value={userData.country}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <span className="nice">省份：</span>
            <input
              type="text"
              name="province"
              value={userData.province}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <span className="nice">城市：</span>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleInputChange}
            />
          </p>
          <input className="user-info-submit" type="submit" value="修改信息" />
        </form>
      </div>
      <div className="user-info-main">修改密码

      <form onSubmit={handlePasswordSubmit}>
      <p>
            <span className="nice">原密码：</span>
            <input
              type="text"
              name="oldPassword"
              //value={userData.password}
              onChange={handlePasswordInputChange}
            />
          </p>
          <p>
            <span className="nice">新密码：</span>
            <input
              type="text"
              name="newPassword"
              //value={userData.newPassword}
              onChange={handlePasswordInputChange}
            />
          </p>
          <p>
            <span className="nice">确认密码：</span>
            <input
              type="text"
              name="confirmPassword"
              //value={userData.confirmPassword}
              onChange={handlePasswordInputChange}
            />
          </p>
          <input className="user-info-submit" type="submit" value="修改密码" />
      </form>
      {renderMessage()} {/* Render the message */}
      </div>
      </div>
  );
};

export default Member;
