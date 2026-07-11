// pages/Accueil.jsx - Catalogue des véhicules
import { useState, useEffect } from 'react';
import axios from 'axios';
import CarteVehicule from '../components/CarteVehicule';

function Accueil() {
  // Le state : la liste des véhicules, vide au départ
  const [vehicules, setVehicules] = useState([]);
  const [erreur, setErreur] = useState(null);

  // Au chargement de la page, on appelle l'API
  useEffect(() => {
    axios.get('http://localhost:3000/api/vehicules')
      .then((reponse) => setVehicules(reponse.data))
      .catch(() => setErreur("Impossible de charger les véhicules"));
  }, []);

  return (
    <div>
      {/* Bandeau d'accroche */}
      <section className="hero">
        <h1>Louez votre gari en quelques clics</h1>
        <a href="#catalogue" className="btn">Voir les véhicules</a>
      </section>

      {/* Catalogue */}
      <section id="catalogue">
        <h2>Nos véhicules</h2>
        {erreur && <p className="message-erreur">{erreur}</p>}
        <div className="grille-vehicules">
          {vehicules.map((v) => (
            <CarteVehicule key={v.id} vehicule={v} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Accueil;