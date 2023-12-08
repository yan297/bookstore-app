import React, { useState, useEffect  } from 'react';
import './css/index.css'; // 导入相关的 CSS 文件
import './css/swiper3.07.min.css'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo4 from './images/logo4.png'; 
import notice from './images/notice.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import focus1 from './images/focus1.jpg';
import focus2 from './images/focus2.jpg';
import focus3 from './images/focus3.jpg';
import focus4 from './images/focus4.jpg';
import focus5 from './images/focus5.jpg';
import BooksList from './Booklist';
import noimage from './images/noimage.png';

const Home = () => {
  const imageStyle = {
    width: '1200px',
    height: 'auto'
  }
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  const [searchTerm, setSearchTerm] = useState(''); // 用于存储用户输入的搜索词
  const history = useNavigate(); // 获取路由历史对象
  const [searchType, setSearchType] = useState('title'); // 新增搜索类型状态

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchType === 'title') {
      history(`/list?search=${encodeURIComponent(searchTerm)}`);
    } else if (searchType === 'author') {
      history(`/list?searchBy=author&search=${encodeURIComponent(searchTerm)}`);
    }  };

// 例如，获取成功励志类别的书籍信息
  const [books, setBooks] = useState([]); // State to store fetched books

  const fetchBooks = (category) => {
    const API_KEY = 'AIzaSyDJgK_o0Fj_Fxg8rDNqdWo-Mg4JXJ_8Xf4';
    const CATEGORY_URL = `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=12&key=${API_KEY}`;

    fetch(CATEGORY_URL)
      .then((response) => response.json())
      .then((data) => {
        const fetchedBooks = data.items || []; // Check if data.items exists

        // Update state with fetched books
        setBooks(fetchedBooks);
      })
      .catch((error) => {
        console.error('Error fetching books for the selected category:', error);
      });
  };
  const handleCategoryClick = (category) => {
    //console.log("111");
    fetchBooks(category);
  };
  // Use useEffect to fetch books initially or when certain dependencies change
  useEffect(() => {
    // Fetch books for a default category initially, e.g., 'Computer'
    fetchBooks('Science');
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // 根据 token 存在与否设定登录状态
  //const [userId, setUserId] = useState(localStorage.getItem('userId')); // 获取用户ID
  //console.log(localStorage.getItem('userId'));
  const handleLogout = () => {
    localStorage.removeItem('token'); // 清除 token
    //localStorage.removeItem('userId'); // 清除用户ID
    setIsLoggedIn(false); // 更新登录状态为未登录
    //setUserId(null); // 清空用户ID
  };



  return (
    <div>
      <div className="top" id="item4">
        <div className="container clearfix">
          <ul className="clearfix fr">
          {isLoggedIn ? (
            <>
              <li>Logged</li>
              <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/join#login">Login</Link></li>
              <li><Link to="/join#register">Register</Link></li>
            </>
          )}
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/member" style={{ border: 'none' }}>Member</Link></li>
            <li><Link to="/admin">Admin</Link></li>

          </ul>
        </div>
      </div>


      <div class="banner container">
      <img src={notice} alt="" style={imageStyle}/>
      <div class="clearfix">
      <div class="about fl">
			<h1>WSB</h1>
			<p><span>WSB </span>stands for Western Secondhand Bookstore, striving to create Western's largest book borrowing and exchanging system for secondhand books. With WSB, passionate book lovers can read their favorite books at an extremely low cost without any worries!</p>
		</div>
    <div id="fsD1" class="focus fl">
    <Slider {...settings}>
        <div>
          <img src={focus1} alt="Slide 1" />
        </div>
        <div>
          <img src={focus2} alt="Slide 2" />
        </div>
        <div>
          <img src={focus3} alt="Slide 3" />
        </div>
        <div>
          <img src={focus4} alt="Slide 4" />
        </div>
        <div>
          <img src={focus5} alt="Slide 5" />
        </div>
      </Slider>
  </div>
    <div class="help fr">
			<h2>Public Booklist</h2>
			<ul>
				<li><a href="notice-detail.html">Booklist1</a></li>
				<li><a href="notice-detail.html">Booklist2</a></li>
				<li><a href="notice-detail.html">Booklist3</a></li>
				<li><a href="notice-detail.html">Booklist4</a></li>
				<li><a href="notice-detail.html">Booklist5</a></li>
			</ul>
			<h2>Your Privite Booklist</h2>
			<ul>
				<li><a href="help.html">Userbooklist1</a></li>
				<li><a href="help.html">Userbooklist2</a></li>
				<li><a href="help.html">Userbooklist3</a></li>
				<li><a href="help.html">Userbooklist4</a></li>
			</ul>
    </div>
    </div>
    
      {/* 传递搜索词给 BooksList 组件 */}
      <BooksList searchTerm={searchTerm} />
      

      <div class="item clearfix" id="item1">
		<h1>Online Books<span></span>
		</h1>
		<div class="list fl">
			<ul class="one">
      <li><a href="#" onClick={() => handleCategoryClick('Biology')}>Biology</a></li>
      <li><a href="#" onClick={() => handleCategoryClick('Science')}>Science</a></li>
      <li><a href="#" onClick={() => handleCategoryClick('Art')}>Art</a></li>
      <li><a href="#" onClick={() => handleCategoryClick('Chinese')}>Chinese</a></li>
      <li><a href="#" onClick={() => handleCategoryClick('History')}>History</a></li>
      <li><a href="#" onClick={() => handleCategoryClick('English')}>English</a></li>
			</ul>
		</div>

		<div class="book-wrap fr">
			<div class="book clearfix">
      {books.map((book) => (
      <dl key={book.id}>
        <dt>
          <a href={book.volumeInfo.previewLink}>
            <img src={book.volumeInfo.imageLinks?.thumbnail || noimage} alt="" />
          </a>
        </dt>
        <dd>
          <p>
            <a href={book.volumeInfo.previewLink}>{book.volumeInfo.title}</a>
          </p>
          <p>Author: {book.volumeInfo.authors?.join(', ')}</p>
          <p>Price:${' '}
          {book.volumeInfo?.industryIdentifiers[0]?.identifier
              ? book.volumeInfo.industryIdentifiers[0].identifier.replace(/\D/g, '').match(/[1-9]\d{1}/)
              : 'N/A'}
</p>
        </dd>
      </dl>
    ))}
			</div>
		</div>
	</div>
    </div>
    </div>
  );
};

export default Home;
