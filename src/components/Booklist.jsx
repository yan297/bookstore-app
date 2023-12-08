import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/index.css';
import './css/swiper3.07.min.css';
import logo4 from './images/logo4.png'; 
import handleSearch from './Homepage.jsx';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // Declare searchType state
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:4000/users/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchBy = searchParams.get('searchBy'); // 获取搜索类型
    const search = searchParams.get('search');
    setSearchTerm(search || '');
    setSearchType(searchBy || 'title'); // 设置搜索类型，默认为标题

    // 更新根据不同搜索类型过滤书籍的逻辑
    if (searchType === 'author') {
      // 发送根据作者字段搜索的请求
      fetch(`http://localhost:4000/users/books?author=${encodeURIComponent(search)}`)
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books by author:', error));
    } else {
      // 默认按照标题搜索的请求逻辑
      fetch('http://localhost:4000/users/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }
  }, [location.search]);


  // 过滤显示符合搜索词的书籍
  const filteredBooks = books.filter(book => {
    if (searchType === 'title') {
      return book.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'author') {
      return book.author.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;  });

  return (
    
    <div className="item clearfix">
            <div className="header">
        <div className="container clearfix">
          <div className="logo fl">
          <Link to="/"><img src={logo4} alt="" /></Link>
          </div>
          <div className="seacher fl">
          <form onSubmit={handleSearch} method="get">
            <input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          <input
          type="submit"
          value="SearchTitle"
          onClick={() => setSearchType('title')} // 更新搜索类型为标题
          />
          <input
          type="submit"
          value="Author"
          onClick={() => setSearchType('author')} // 更新搜索类型为作者
            />
          </form>
            <p>Popular Searches：<Link to="/list?search=Oliver">Oliver</Link> <Link to="/list?search=Prince">Prince</Link> </p>
          </div>
          <div className="mm fr clearfix">
          <Link to="/list">Buy</Link>
          <Link to="/publish">Publish</Link>
          </div>
        </div>
      </div>
      <h1>Secondhand Books</h1>

      <div className="tabs book clearfix">
        {filteredBooks.map(book => (
          <dl key={book.id}>
            {/* 修改链接路径 */}
            <dt>      
              <Link to={`/detail/${encodeURIComponent(book.title)}/${book.id}`}><img src={book.image} alt={book.title} /></Link></dt>
            <dd>
              {/* 修改链接路径 */}
              <p>
              <Link to={{
                pathname: `/detail/${encodeURIComponent(book.title)}/${book.id}`,
                  state: { book } // 传递书籍信息作为 state
                   }}>
                  {book.title}
                </Link></p>
                <p>Author：{book.author}</p>
                <p><s>价格：${book.originalprice}</s> ${book.discountedprice}</p>
              <p>数量：{book.quantity}</p>
              
            </dd>
          </dl>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
