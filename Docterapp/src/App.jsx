import { Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbars from './components/Navbarr';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutDoctor from './pages/AboutDetails';
import GPServices from './pages/Servicess';
import ContactMe from './pages/Contact';
import DoctorLogin from './pages/Register';

function App() {
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutDoctor />} />
        <Route path="/services" element={<GPServices />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/login" element={<DoctorLogin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;