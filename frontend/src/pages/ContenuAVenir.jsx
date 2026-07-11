// pages/ContenuAVenir.jsx - Rubriques non développées (consigne : aucun lien cassé)
import { Link } from 'react-router-dom';

function ContenuAVenir() {
  return (
    <div className="page-vide">
      <h1>Contenu à venir</h1>
      <p>Cette rubrique est en cours de construction. Revenez bientôt !</p>
      <Link to="/" className="btn">Retour à l'accueil</Link>
    </div>
  );
}

export default ContenuAVenir;