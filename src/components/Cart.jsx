import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/styles.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem('token');
    //console.log(token);
    try {
      const response = await fetch('http://localhost:4000/users/cartItems', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
  
      const data = await response.json();
      setCartItems(data.cartItems);

      // 一次性获取书籍信息并计算总价
      calculateTotalPrice(data.cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // 在这里可以添加适当的错误处理逻辑，例如显示错误信息给用户或执行其他操作
    }
  };

  const calculateTotalPrice = async (items) => {
    try {
      let totalPrice = 0;
      console.log(items);
      const promises = items.map(async (item) => {
        const response = await fetch(`http://localhost:4000/users/books/${item.bookid}`);
        const bookData = await response.json();
        totalPrice += bookData.discountedprice * item.quantity;
      });

      await Promise.all(promises);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error('Error calculating total price:', error);
    }
  };

  const removeFromCart = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      console.log(bookId)
      const response = await fetch(`http://localhost:4000/users/removeFromCart/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }  
      });
      if (response.ok) {
        console.log(`Book ID ${bookId} removed from cart`);
        fetchCartItems();
      } else {
        console.error(`Error removing book ID ${bookId} from cart`);
      }
    } catch (error) {
      console.error('Error removing book from cart:', error);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <table className="table-fill">
        <thead>
          <tr>
            <th colSpan="2">Product</th>
            <th>#</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Item Removal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.bookId}>
              <td><img src={item.image} alt={item.title} /></td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>${item.discountedprice}</td>  
              <td>${item.quantity * item.discountedprice}</td>
              <td><button onClick={() => removeFromCart(item.bookId)}>Remove</button></td>
            </tr>
          ))}
          <tr className="totals">
            <td colSpan="4">Subtotal</td>
            <td>${totalPrice}</td>
            <td><button >结账</button></td>
          </tr>
        </tbody>
      </table>
      <div>
        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
