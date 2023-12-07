import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/users/getuserlist');
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAuthorization = (userId, userRole) => {
    // 根据您的实际需求编写授权逻辑
    console.log(`Authorizing user ${userId} with role ${userRole}`);
    // 执行授权操作
  };

  const handleDeactivate = (userId, userStatus) => {
    // 根据您的实际需求编写停用逻辑
    console.log(`Deactivating user ${userId} with status ${userStatus}`);
    // 执行停用操作
  };

  const handleActivation = (userId, userStatus) => {
    // 根据您的实际需求编写激活逻辑
    console.log(`Activating user ${userId} with status ${userStatus}`);
    // 执行激活操作
  };

  return (
    <div className="layui-container">
      <ul className="layui-nav" lay-filter="">
      </ul>
      <table className="layui-table" lay-data="{height:500, url:'http://localhost:4000/users/page', page:true}" id="userTable">
        <thead>
          <tr>
            <th lay-data="{field:'userId', width:150}">用户编号</th>
            <th lay-data="{field:'nickName', width:150}">用户昵称</th>
            <th lay-data="{field:'userName', width:150}">用户名</th>
            <th lay-data="{field:'phone', width:150}">联系方式</th>
            <th lay-data="{field:'userRole', width:100}">用户类型</th>
            <th lay-data="{field:'userStatus', width:100}">用户状态</th>
            <th lay-data="{toolbar: '#optionBar', width:200}">操作</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.nickName}</td>
              <td>{user.userName}</td>
              <td>{user.phone}</td>
              <td>{user.userRole}</td>
              <td>{user.userStatus}</td>
              <td>
                <button className="layui-btn layui-btn-success layui-btn-xs" onClick={() => handleAuthorization(user.userId, user.userRole)}>
                  管理授权
                </button>
                <button className="layui-btn layui-btn-danger layui-btn-xs" onClick={() => handleDeactivate(user.userId, user.userStatus)}>
                  停用
                </button>
                <button className="layui-btn layui-btn-normal layui-btn-xs" onClick={() => handleActivation(user.userId, user.userStatus)}>
                  激活
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
