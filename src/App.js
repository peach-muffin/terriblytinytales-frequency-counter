import './App.css';
import FetchData from './components/FetchData';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/frequency-counter" element={<Navbar />} />
          </Routes>
        </BrowserRouter>
        <FetchData/>
      </div>
    </>
  );
}

export default App;
