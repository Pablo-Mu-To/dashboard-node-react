import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>Luntia</h1>
        </div>
        <ul className="navbar-menu">
          <li>
            <Link
              to="/"
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/voluntarios"
              className={`navbar-link ${isActive('/voluntarios') ? 'active' : ''}`}
            >
              Voluntarios
            </Link>
          </li>
          <li>
            <Link
              to="/socios"
              className={`navbar-link ${isActive('/socios') ? 'active' : ''}`}
            >
              Socios
            </Link>
          </li>
          <li>
            <Link
              to="/turnos"
              className={`navbar-link ${isActive('/turnos') ? 'active' : ''}`}
            >
              Turnos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
