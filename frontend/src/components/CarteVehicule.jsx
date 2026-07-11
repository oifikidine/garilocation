// components/CarteVehicule.jsx - Carte d'un véhicule dans le catalogue
import { Link } from 'react-router-dom';

function CarteVehicule({ vehicule }) {
  return (
    <div className="carte-vehicule">
      <img src={vehicule.image_url} alt={`${vehicule.marque} ${vehicule.modele}`} />
      <div className="carte-contenu">
        <h3>{vehicule.marque} {vehicule.modele}</h3>
        <p className="prix">{vehicule.prix_jour} € / jour</p>
        <Link to={`/vehicule/${vehicule.id}`} className="btn">Voir le détail</Link>
      </div>
    </div>
  );
}

export default CarteVehicule;