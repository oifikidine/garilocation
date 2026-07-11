// components/Header.jsx - Navigation avec menu burger sur mobile
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

  const handleDeconnexion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
    navigate('/');
    window.location.reload();
  };

  // Ferme le menu après un clic sur un lien (confort mobile)
  const fermerMenu = () => setMenuOuvert(false);

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={fermerMenu}>GARILocation</Link>

      {/* Bouton burger : visible uniquement sur mobile (via CSS) */}
      <button className="burger" onClick={() => setMenuOuvert(!menuOuvert)} aria-label="Menu">
        ☰
      </button>

      <nav className={menuOuvert ? 'nav-ouverte' : ''}>
        <Link to="/" onClick={fermerMenu}>Accueil</Link>

        {!utilisateur && <Link to="/connexion" onClick={fermerMenu}>Connexion</Link>}

        {utilisateur && utilisateur.role === 'client' && (
          <>
            <Link to="/mes-reservations" onClick={fermerMenu}>Mes réservations</Link>
            <button onClick={handleDeconnexion} className="btn-deconnexion">Déconnexion</button>
          </>
        )}

        {utilisateur && utilisateur.role === 'admin' && (
          <>
            <Link to="/admin" onClick={fermerMenu}>Espace admin</Link>
            <button onClick={handleDeconnexion} className="btn-deconnexion">Déconnexion</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;