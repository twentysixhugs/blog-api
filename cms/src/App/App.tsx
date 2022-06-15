import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Posts from '../pages/Posts';
import Post from '../pages/Post';
import About from '../pages/About';
import { ThemeStore } from '../context/Theme/ThemeStore';
import Theme from '../context/Theme/Theme';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import NewPost from '../pages/NewPost';
import TokenStore from '../context/Token/TokenStore';
import EditPost from '../pages/EditPost';
import DeletePost from '../pages/DeletePost';

function App() {
  return (
    <ThemeStore>
      <TokenStore>
        <Theme>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Posts />}></Route>
              <Route path="author/posts/:postId" element={<Post />} />
              <Route
                path="author/posts/:postId/edit"
                element={<EditPost />}
              />
              <Route
                path="author/posts/:postId/delete"
                element={<DeletePost />}
              />
              <Route path="about" element={<About />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
              <Route path="new" element={<NewPost />} />
            </Routes>
          </BrowserRouter>
        </Theme>
      </TokenStore>
    </ThemeStore>
  );
}

export default App;
