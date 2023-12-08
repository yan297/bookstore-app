import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/index.css';
import './css/swiper3.07.min.css';
import logo4 from './images/logo4.png'; 
//import handleSearch from './Homepage.jsx';
import { useNavigate } from 'react-router-dom';


const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title'); // Declare searchType state
  const location = useLocation();
  const history = useNavigate(); // 获取路由历史对象

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === 'title') {
      history(`/list?search=${encodeURIComponent(searchTerm)}`);
    } else if (searchType === 'author') {
      history(`/list?searchBy=author&search=${encodeURIComponent(searchTerm)}`);
    }  };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/users/books');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          setBooks(data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const searchBy = searchParams.get('searchBy');
      const search = searchParams.get('search');
      setSearchTerm(search || '');
      setSearchType(searchBy || 'title');
      
      const fetchData = async () => {
        try {
          let searchUrl = 'http://localhost:4000/users/books';
          if (searchType === 'author') {
            searchUrl = `http://localhost:4000/users/books?author=${encodeURIComponent(search)}`;
          }
          const response = await fetch(searchUrl);
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          setBooks(data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
  
      fetchData();
    }, [location.search, searchType]);
  


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
            <p>Popular Searches：<Link to="/list?search=Oliver">Oliver</Link> <Link to="/list?search=Prince">Prince</Link> 
            <Link to="/list?searchBy=author&search=Charles">Charles</Link> <Link to="/list?searchBy=author&search=Antoine">Antoine</Link>
            </p>
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
