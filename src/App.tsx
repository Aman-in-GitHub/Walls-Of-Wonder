import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './elements/Navbar';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
