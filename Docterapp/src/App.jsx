import { Routes, Route } from 'react-router-dom';

import './App.css';
import Navbars from './components/Navbarr';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutDoctor from './pages/AboutDetails';
import GPServices from './pages/Servicess';
import ContactMe from './pages/Contact';

import Feedback from './pages/Feedback';
import BMI from './pages/BMI';

function App() {
  return (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutDoctor />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/services" element={<GPServices />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/BMI" element={<BMI />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;