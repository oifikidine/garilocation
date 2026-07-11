// components/Header.jsx - Navigation, adaptée selon l'utilisateur connecté
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  // On lit l'utilisateur stocké à la connexion (null si personne)
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

  const handleDeconnexion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <Link to="/" className="logo">GARILocation</Link>
      <nav>
        <Link to="/">Accueil</Link>

        {/* Visiteur non connecté */}
        {!utilisateur && <Link to="/connexion">Connexion</Link>}

        {/* Client connecté */}
        {utilisateur && utilisateur.role === 'client' && (
          <>
            <Link to="/mes-reservations">Mes réservations</Link>
            <button onClick={handleDeconnexion} className="btn-deconnexion">Déconnexion</button>
          </>
        )}

        {/* Admin connecté */}
        {utilisateur && utilisateur.role === 'admin' && (
          <>
            <Link to="/admin">Espace admin</Link>
            <button onClick={handleDeconnexion} className="btn-deconnexion">Déconnexion</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;