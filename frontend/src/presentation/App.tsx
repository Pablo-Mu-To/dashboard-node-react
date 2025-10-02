import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Voluntarios } from './pages/Voluntarios';
import { Socios } from './pages/Socios';
import { Turnos } from './pages/Turnos';

export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voluntarios" element={<Voluntarios />} />
        <Route path="/socios" element={<Socios />} />
        <Route path="/turnos" element={<Turnos />} />
      </Routes>
    </BrowserRouter>
  );
}