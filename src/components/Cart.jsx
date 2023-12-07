import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const token = localStorage.getItem('accessToken');
  
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
      const promises = items.map(async (item) => {
        const response = await fetch(`http://localhost:4000/users/books/${item.bookId}`);
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
    try {
      const response = await fetch(`http://localhost:4000/users/removeFromCart/${bookId}`, {
        method: 'DELETE',
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
      <div>
        {cartItems.map((item) => (
          <div key={item.bookId}>
            <p>Book ID: {item.bookId}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.bookId)}>Remove</button>
          </div>
        ))}
      </div>
      <div>
        <h3>Total Price: ${totalPrice}</h3>
        <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
