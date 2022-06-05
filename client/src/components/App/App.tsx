import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Posts from '../Posts';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Posts />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
