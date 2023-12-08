import React, { useState } from 'react';
import './css/animate-custom.css'
import './css/index.css'
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    userid: '',
    password: '',
    email: '', 
    country: '',
    province: '',
    city: '',
    //password_confirm: '',
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate(); // 获取用于导航的 navigate 函数

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // 处理登录表单提交
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
      //console.log(response);
      console.log(data); // 打印服务器响应的数据到控制台
      alert(data.message);
      //console.log(data.token);
        // 这里可以根据服务器响应的数据执行其他操作
        // 存储 token 到 localStorage 中
      localStorage.setItem('token', data.token);

      // 登录成功后重定向到主页
      // 使用路由跳转或其他方式将用户带到主页
      navigate('/');

      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Request error:', error);
    }    
    console.log('Login Submit:', loginData);
    // 调用登录接口
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // 处理注册表单提交
    fetch('http://localhost:4000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })
        .then((response) => response.json())
        .then((data) => {
          // 处理从服务器返回的响应
          console.log(data);
          alert(data.message);
        })
        .catch((error) => {
          // 处理错误
          console.error('Error:', error);
        });  
    console.log('Register Submit:', registerData);
    navigate('/');
    // 调用注册接口
  };

  return (
    <div id="container_demo">
      <a className="hiddenanchor" id="toregister"></a>
      <a className="hiddenanchor" id="tologin"></a>
      <div id="wrapper">
        <div id="login" className="animate form">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <p>
                <label for="userid" class="uname" data-icon="u">User ID</label>
                <input id="userid" name="userid" required="required" type="text" placeholder="Enter User ID" onChange={handleLoginChange}/>
            </p>
            <p>
                <label for="password" class="youpasswd" data-icon="p">Password</label>
                <input id="password" name="password" required="required" type="password" placeholder="Enter Password" onChange={handleLoginChange}/>
            </p>
            <p class="keeplogin">
                <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" />
                <label for="loginkeeping">Keep me logged in</label>
            </p>
            <p class="login button">
                <input type="submit" value="Login" />
            </p>
            <p class="change_link">
                Not a member yet? <a href="#toregister" class="to_register">Join us</a>
            </p>
          </form>
        </div>

        <div id="register" className="animate form">
          <form onSubmit={handleRegisterSubmit}>
          <h1>Register</h1>
            <p>
                <label for="userid" class="uname" data-icon="u">User ID</label>
                <input id="useridsignup" name="userid" required="required" type="text" placeholder="User ID (used for login)" onChange={handleRegisterChange}/>
            </p>
            <p>
                <label for="email" class="youmail">Email</label>
                <input id="email" name="email" required="required" type="email" placeholder="Email" onChange={handleRegisterChange}/>
            </p>
            <p>
                <label>Country</label>
                <input id="country" name="country" required="required" type="text" placeholder="Country" onChange={handleRegisterChange}/>
            </p>
            <p>
                <label>Province</label>
                <input id="province" name="province" required="required" type="text" placeholder="Province" onChange={handleRegisterChange}/>
            </p>
            <p>
                <label>City</label>
                <input id="city" name="city" required="required" type="text" placeholder="City" onChange={handleRegisterChange}/>
            </p>
            <p>
                <label for="passwordsignup" class="youpasswd" data-icon="p">Password</label>
                <input id="password" name="password" required="required" type="password" placeholder="Password" onChange={handleRegisterChange}/>
            </p>
            <p>
                <label for="password_confirm" class="youpasswd" data-icon="p">Confirm Password</label>
                <input id="password_confirm" name="password_confirm" required="required" type="password" placeholder="Confirm Password" />
            </p>
            <p class="signin button">
                <input type="submit" value="Register"/>
            </p>
            <p class="change_link">
                Already a member? <a href="#tologin" class="to_register">Go to Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Join;
