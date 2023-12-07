import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [userList, setUserList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/users/getuserlist');
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    
    fetchData();
  }, []);

  const handleAuthorization = (userId, userRole) => {
    // 根据您的实际需求编写授权逻辑
    console.log(`Authorizing user ${userId} with role ${userRole}`);
    // 执行授权操作
    if (userId === '123456') {
      console.log('不可修改原始账户！');
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
            <th lay-data="{field:'userId', width:150}">用户id</th>
            <th lay-data="{field:'nickName', width:150}">用户邮箱</th>
            <th lay-data="{field:'userStatus', width:100}">用户状态</th>
            <th lay-data="{toolbar: '#optionBar', width:200}">操作</th>
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
                  管理授权
                </button>
                <button className="layui-btn layui-btn-danger layui-btn-xs" onClick={() => handleActivation(user.userid, user.identity)}>
                  停用/激活
                </button>
                <button className="layui-btn layui-btn-normal layui-btn-xs" onClick={() => handleDelete(user.userid, user.identity)}>
                  删除
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
