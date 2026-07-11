// pages/Page404.jsx - Page affichée pour toute URL inexistante
import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div className="page-vide">
      <h1>404</h1>
      <p>Oups, cette page n'existe pas.</p>
      <Link to="/" className="btn">Retour à l'accueil</Link>
    </div>
  );
}

export default Page404;