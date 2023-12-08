import React from 'react';
import Join from './components/Join.jsx';
import Home from './components/Homepage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublishBook from './components/Publish.jsx'; // 你的发布图书的组件路径
import BooksList from './components/Booklist.jsx'; // 引入书籍列表组件
import BookDetail from './components/BookDetail.jsx';
import Member from './components/Member.jsx';
import Cart from './components/Cart.jsx';
import Admin from './components/Admin.jsx';
import Checkout from './components/Checkout .jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/publish" element={<PublishBook />} /> 
        <Route path="/list" element={<BooksList />} /> 
        <Route path="/detail/:title/:id" element={<BookDetail />} />
        <Route path="/member" element={<Member />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/checkout/:bookIds" element={<Checkout />} />

      </Routes>
    </Router>
  );
}
  
export default App;
