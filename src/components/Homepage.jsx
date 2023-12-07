import React, { useState } from 'react';
import './css/index.css'; // 导入相关的 CSS 文件
import './css/swiper3.07.min.css'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BooksList from './Booklist';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 用于存储用户输入的搜索词
  const history = useNavigate(); // 获取路由历史对象

  const handleSearch = (e) => {
    e.preventDefault();
    history(`/list?search=${encodeURIComponent(searchTerm)}`);    // 更新路由至 Booklist 并传递搜索词
  };


  return (
    <div>
      <div className="top" id="item4">
        <div className="container clearfix">
          <ul className="clearfix fr">
            <li><Link to="/join#tologin">登录</Link></li>
            <li><Link to="/join#toregister">注册</Link></li>
            <li><Link to="/cart">购物车</Link></li>
            <li><Link to="/member" style={{ border: 'none' }}>个人中心</Link></li>
            <li><Link to="/admin">管理</Link></li>

          </ul>
        </div>
      </div>

      <div className="header">
        <div className="container clearfix">
          <div className="logo fl">
            <a href="index.html"><img src="images/logo4.png" alt="" /></a>
          </div>
          <div className="seacher fl">
          <form onSubmit={handleSearch} method="get">
            <input
            type="text"
            placeholder="小伙伴，你想找什么?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input type="submit" value="搜 索"/>
          </form>
            <p>热门搜索：<a href="#">自行车</a> <a href="#">笔记本</a> <a href="#">散热器</a> <a href="#">考研资料</a> <a href="#">摩托车</a> <a href="#">手机</a> <a href="#">轮滑鞋</a> <a href="#">显示器</a> <a href="#">显示器</a> <a href="#">显示器</a> <a href="#">显示器</a></p>
          </div>
          <div className="mm fr clearfix">
          <Link to="/list">我要买</Link>
          <Link to="/publish">我要卖</Link>
          </div>
        </div>
      </div>
      {/* 传递搜索词给 BooksList 组件 */}
      <BooksList searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
