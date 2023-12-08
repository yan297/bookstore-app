import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const history = useNavigate();

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // 从 localStorage 中获取 token
  
      const response = await fetch('http://localhost:4000/users/getuserlist', {
        headers: {
          Authorization: `Bearer ${token}`, // 设置请求头部信息带有 token
        },
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setUserList(data);
      } else if (response.status === 403) {
        // 如果没有权限访问管理员页面，返回到主页面并显示错误消息
        history('/');
        alert('You do not have permission to access the admin page!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, [history]);

  const handleAuthorization = (userId, userRole) => {
    // 根据您的实际需求编写授权逻辑
    console.log(`Authorizing user ${userId} with role ${userRole}`);
    // 执行授权操作
    if (userId === '123456') {
      console.log('The original account cannot be modified!');
      alert('The original account cannot be modified!');
      return; // 如果是原始账户，停止执行后续操作
    }
  
    // 通过API调用进行身份授权修改
    // 例如，可以使用fetch或axios发送POST请求到服务器端以更新用户身份
    // 注意：以下代码仅作为示例，请替换成您实际的API地址和逻辑
    fetch(`http://localhost:4000/users/updateUserIdentify/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userRole: 'admin' }), // 替换为要设置的用户角色
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 处理服务器返回的数据
        if(data.error){
          alert(data.error);}
          else{alert(data.message);}
        fetchData(); // 调用刷新列表的函数
      })
      .catch((error) => {
        console.error('Error updating user role:', error);
      });
  };

  const handleActivation = (userId, userStatus) => {
    // 根据您的实际需求编写激活逻辑
    console.log(`Activating user ${userId} with status ${userStatus}`);
    // 执行激活操作
  
    // 通过API调用进行用户激活
    fetch(`http://localhost:4000/users/activateUser/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 处理服务器返回的数据
        if(data.error){
        alert(data.error);}
        else{alert(data.message);}
        fetchData(); // 调用刷新列表的函数
      })
      .catch((error) => {
        console.error('Error activating user:', error);
      });
  };

  const handleDelete = (userId) => {
    // 根据您的实际需求编写删除用户逻辑
    console.log(`Deleting user ${userId}`);
    // 执行删除操作
  
    // 通过API调用进行用户删除
    fetch(`http://localhost:4000/users/deleteUser/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 处理服务器返回的数据
        if(data.error){
        alert(data.error);}
        else{alert(data.message);}
        fetchData(); // 调用刷新列表的函数
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="layui-container">
      <ul className="layui-nav" lay-filter="">
      </ul>
      <table className="layui-table"  id="userTable">
        <thead>
          <tr>
            <th lay-data="{field:'userId', width:150}">Userid</th>
            <th lay-data="{field:'nickName', width:150}">Useremail</th>
            <th lay-data="{field:'userStatus', width:100}">Userstatus</th>
            <th lay-data="{toolbar: '#optionBar', width:200}">Operate</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid}</td>
              <td>{user.email}</td>
              <td>{user.identity}</td>
              <td>
                <button className="layui-btn layui-btn-success layui-btn-xs" onClick={() => handleAuthorization(user.userid, user.identity)}>
                Authorization
                </button>
                <button className="layui-btn layui-btn-danger layui-btn-xs" onClick={() => handleActivation(user.userid, user.identity)}>
                De/Activate
                </button>
                <button className="layui-btn layui-btn-normal layui-btn-xs" onClick={() => handleDelete(user.userid, user.identity)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
