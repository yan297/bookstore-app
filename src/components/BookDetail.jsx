import React, { useEffect, useState } from 'react';
import {useNavigate , useParams } from 'react-router-dom';
import './css/index.css';
import './css/detail.css';

const BookDetail = ({ location }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const { title, id } = useParams();
  const navigate  = useNavigate (); // 获取路由历史


  useEffect(() => {
    const API_KEY = 'AIzaSyDJgK_o0Fj_Fxg8rDNqdWo-Mg4JXJ_8Xf4'; // 替换为你的 Google Books API 密钥
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${title}&key=${API_KEY}`;
    //console.log(title);
    //console.log(id);
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        //console.log('Complete bookDetails:', data);
        // 处理 API 响应并设置书籍详情数据
        setBookDetails(data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [title,id]);

  const addToCart = async () => {
    // 执行添加到购物车的逻辑
    const bookId = id; // 获取书籍 ID
    const token = localStorage.getItem('token'); // 获取用户 token
    //const decodedToken = decodedToken(token); // 解码token以获取信息
    //const userId = decodedToken.userId; // 获取用户ID

    //console.log(bookId);
    //console.log(token);
    //console.log(userId);
    try {
      const response = await fetch('http://localhost:4000/users/addcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 将 token 放在请求头中
        },
        body: JSON.stringify({ bookId }), // 发送书籍 ID 到服务器
      });

      if (response.ok) {
        console.log('Successfully added to shopping cart');
        alert('Successfully added to shopping cart')
        // 这里你可以添加一些逻辑来显示成功添加到购物车的信息或者跳转到购物车页面
        //navigate('/cart'); // 使用 navigate 进行页面跳转

      } else {
        console.error('Add to Cart failed');
        alert('Add to Cart failed')
      }
    } catch (error) {
      console.error('Request error:', error);
      alert('Request error:')

    }
  };


  return (
    
    <div class="main-left fl clearfix">
      {bookDetails ? (
        <div class="zoom-wrap fl">
          <div id="zoom">
          {bookDetails.items[0].volumeInfo.imageLinks && bookDetails.items[0].volumeInfo.imageLinks.thumbnail && (
          <img class="bzoom"  width="300" height="424" src={bookDetails.items[0].volumeInfo.imageLinks.thumbnail} alt="Book cover" />
          )}
          </div>
          <div class="attr fl">
          <p>Book Name: {bookDetails.items[0].volumeInfo.title}</p>
          <p>Author: {bookDetails.items[0].volumeInfo.authors.join(', ')}</p>
          <p>Published Date: {bookDetails.items[0].volumeInfo.publishedDate}</p>
          <p>ISBN: {bookDetails.items[0].volumeInfo.industryIdentifiers[0].identifier}</p>
          </div>
          <div>
        <button onClick={addToCart}>加入购物车</button>
          </div>
          <div class="clearfix"></div>
          <div class="description clearfix">
          <h2>Description</h2>
          <p> {bookDetails.items[0].volumeInfo.description}</p>
          </div>
        </div>
        
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  
};

export default BookDetail;
