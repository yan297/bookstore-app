import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/checkout.css'

const Checkout = () => {
  const [bookDetails, setBookDetails] = useState([]);
  const { bookIds } = useParams();
  console.log(bookIds);

  useEffect(() => {
    fetchBookDetails();
  }, [bookIds]);

  const fetchBookDetails = async () => {
    try {
      const idsArray = bookIds.split(',');
      const details = [];

      for (const bookId of idsArray) {
        const response = await fetch(`http://localhost:4000/users/books/${bookId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        details.push(data);
      }

      setBookDetails(details);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  return (
<div class="checkout-container">
    <h1 class="checkout-title">结账</h1>
    <h2 class="summary-title">摘要</h2>
    <table class="book-summary-table">
      <thead>
        <tr>
          <th>书名</th>
          <th>价格</th>
        </tr>
      </thead>
      <tbody>
          {bookDetails.map((book, index) => (
            <tr key={index}>
              <td>{book.title}</td>
              <td>${book.discountedprice}</td>
            </tr>
          ))}
          <tr>
          <td><strong>总计</strong></td>
          <td><strong>$45</strong></td>
        </tr>
        </tbody>
      </table>
      <h2 class="payment-info-title">支付信息</h2>
    <form class="payment-form">
      <label>卡号：</label>
      <input type="text" placeholder="输入卡号" />
      <label>有效期：</label>
      <input type="text" placeholder="输入有效期" />
      <label>CVV：</label>
      <input type="text" placeholder="输入CVV" />
      <button>立即支付</button>
    </form>
  </div>
  );
};

export default Checkout;
