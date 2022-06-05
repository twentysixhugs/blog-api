import { BrowserRouter, Routes } from 'react-router-dom';
import Header from '../Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes></Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
