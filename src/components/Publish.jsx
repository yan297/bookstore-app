import React, { useState } from 'react';
import './css/animate-custom.css'
import './css/index.css'
import { useNavigate } from 'react-router-dom';

const PublishBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    image: '',
    quantity: 0,
    originalPrice: 0,
    discountedPrice: 0,
  });
  const navigate = useNavigate(); // 获取用于导航的 navigate 函数

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handlePublishSubmit = (e) => {
    e.preventDefault();

    // 检查是否所有必填字段都已填写
    if (
      !bookData.title ||
      bookData.quantity === 0 ||  // 检查 quantity 不为零
      bookData.originalPrice === 0  // 检查 originalPrice 不为零
    ) {
      alert('Please fill in all required fields and make sure quantity and price are not zero');
      return;
    }

    let updatedBookData = { ...bookData };

    if (!bookData.image){
      
      updatedBookData = {
      ...updatedBookData,
      image: 'https://th.bing.com/th/id/OIP.z0DJWnxVCQK55-U0DnL9ogHaGu?rs=1&pid=ImgDetMain',
    };
        }
    // 如果 Discounted Price 为空，则设置为与 Original Price 相同
    if (bookData.discountedPrice === 0) {
      updatedBookData = {
        ...updatedBookData,
        discountedPrice: updatedBookData.originalPrice,
      };
    }



    fetch('http://localhost:4000/users/books/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBookData),
    })
      .then((response) => response.json())
      .then((data) => {
        // 处理从服务器返回的响应
        console.log(data);
        if(data.error){
          alert(data.error);}
          else{alert(data.message);}
      })
      .catch((error) => {
        // 处理错误
        console.error('Error:', error);
      });
    console.log('Publish Submit:', updatedBookData);
    navigate('/');
    // 调用图书发布接口
  };

  return (
    <div id="wrapper">
      <div id="publish" className="animate form">
      <form onSubmit={handlePublishSubmit}>
      <h1>Publish</h1>
      <p>
        <label>Title:
          <input type="text" name="title" value={bookData.title} onChange={handleInputChange} />
        </label>
      </p>
      <p>
        <label>Author:
          <input type="text" name="author" value={bookData.author} onChange={handleInputChange} />
        </label>
      </p>
      <p>
        <label>Image URL:
          <input type="text" name="image" value={bookData.image} onChange={handleInputChange} />
        </label>
      </p>
      <p>
        <label>Quantity:
          <input type="number" name="quantity" value={bookData.quantity} onChange={handleInputChange} />
        </label>
      </p>
      <p>
        <label>Original Price:
          <input type="number" step="0.01" name="originalPrice" value={bookData.originalPrice} onChange={handleInputChange} />
        </label>
      </p>
      <p>
        <label>Discounted Price:
          <input type="number" step="0.01" name="discountedPrice" value={bookData.discountedPrice} onChange={handleInputChange} />
        </label>
      </p>
      <p class="login button">
            <input type="submit" value="Publish" />
      </p>
      </form>
      </div>
    </div>
  );
  
};

export default PublishBook;