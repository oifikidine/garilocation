// components/Header.jsx - Barre de navigation présente sur toutes les pages
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">GARILocation</Link>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/connexion">Connexion</Link>
      </nav>
    </header>
  );
}

export default Header;