import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import About from '../pages/About';
import { ThemeProvider } from '../context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />}></Route>
          <Route path="posts/:postId" element={<Post />}></Route>
          <Route path="about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
