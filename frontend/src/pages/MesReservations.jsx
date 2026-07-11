// pages/MesReservations.jsx - Les réservations du client connecté
import { useState, useEffect } from 'react';
import axios from 'axios';

function MesReservations() {
  const [reservations, setReservations] = useState([]);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/reservations/mes-reservations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((reponse) => setReservations(reponse.data))
      .catch(() => setErreur('Impossible de charger vos réservations. Êtes-vous connecté ?'));
  }, []);

  // Petit utilitaire : libellé et classe CSS selon le statut
  const libelleStatut = { en_attente: 'En attente', confirmee: 'Confirmée', annulee: 'Annulée' };

  return (
    <div className="page-reservations">
      <h1>Mes réservations</h1>
      {erreur && <p className="message-erreur">{erreur}</p>}
      {!erreur && reservations.length === 0 && <p>Vous n'avez aucune réservation pour le moment.</p>}

      {reservations.map((r) => (
        <div key={r.id} className="carte-reservation">
          <img src={r.Vehicule?.image_url} alt="" />
          <div>
            <h3>{r.Vehicule?.marque} {r.Vehicule?.modele}</h3>
            <p>Du {new Date(r.date_debut).toLocaleDateString('fr-FR')} au {new Date(r.date_fin).toLocaleDateString('fr-FR')}</p>
            <p className="prix">{r.prix_total} €</p>
          </div>
          <span className={`badge badge-${r.statut}`}>{libelleStatut[r.statut]}</span>
        </div>
      ))}
    </div>
  );
}

export default MesReservations;