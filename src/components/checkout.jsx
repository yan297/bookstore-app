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
    const totalDiscountedPrice = bookDetails.reduce(
      (total, book) => total + parseFloat(book.discountedprice),
      0
    );
  
  return (
<div class="checkout-container">
    <h1 class="checkout-title">Payment</h1>
    <h2 class="summary-title">Summary</h2>
    <table class="book-summary-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
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
          <td><strong>Total</strong></td>
          <td><strong>${totalDiscountedPrice.toFixed(2)}</strong></td>
        </tr>
        </tbody>
      </table>
      <h2 class="payment-info-title">Payment Info</h2>
    <form class="payment-form">
      <label>Card #：</label>
      <input type="text" required="required" placeholder="Enter card number" />
      <label>Exp Date</label>
      <input type="text" required="required" placeholder="Enter expiration date" />
      <label>CVV：</label>
      <input type="text" required="required" placeholder="Enter CVV" />
      <button>Pay Now</button>
    </form>
  </div>
  );
};

export default Checkout;
