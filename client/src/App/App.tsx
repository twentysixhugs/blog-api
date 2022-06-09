import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Posts from '../pages/Posts';
import Post from '../pages/Post';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />}></Route>
          <Route path="posts/:postId" element={<Post />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
