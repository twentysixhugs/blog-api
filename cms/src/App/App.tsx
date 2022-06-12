import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import About from '../pages/About';
import { ThemeStore } from '../context/Theme/ThemeStore';
import Theme from '../context/Theme/Theme';
import AdminSignup from '../pages/AdminSignup';

function App() {
  return (
    <ThemeStore>
      <Theme>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Posts />}></Route>
            <Route path="author/posts/:postId" element={<Post />}></Route>
            <Route path="about" element={<About />} />
            <Route path="signup" element={<AdminSignup />} />
          </Routes>
        </BrowserRouter>
      </Theme>
    </ThemeStore>
  );
}

export default App;
