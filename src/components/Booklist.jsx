import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/index.css';
import './css/swiper3.07.min.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetch('http://localhost:4000/users/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    setSearchTerm(search || '');
  }, [location.search]);

  // 过滤显示符合搜索词的书籍
  const filteredBooks = books.filter(book => {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="item clearfix">
      <h1>图书列表</h1>

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
              <p>数量：{book.quantity}</p>
              <p><s>价格：￥{book.originalprice}</s> ￥{book.discountedprice}</p>
            </dd>
          </dl>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
