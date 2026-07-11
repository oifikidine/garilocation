// pages/AdminReservations.jsx - Toutes les réservations (admin)
import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [erreur, setErreur] = useState(null);

  const chargerReservations = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/reservations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((reponse) => setReservations(reponse.data))
      .catch(() => setErreur('Accès refusé ou erreur de chargement'));
  };

  useEffect(() => {
    chargerReservations();
  }, []);

  // Confirmer ou annuler une réservation
  const changerStatut = async (id, statut) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/reservations/${id}/statut`,
        { statut },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      chargerReservations();
    } catch (err) {
      setErreur('Erreur lors du changement de statut');
    }
  };

  const libelleStatut = { en_attente: 'En attente', confirmee: 'Confirmée', annulee: 'Annulée' };

  return (
    <div className="page-admin">
      <h1>Réservations</h1>
      {erreur && <p className="message-erreur">{erreur}</p>}

      {reservations.map((r) => (
        <div key={r.id} className="carte-reservation">
          <div>
            <h3>{r.Vehicule?.marque} {r.Vehicule?.modele}</h3>
            <p>{r.Utilisateur?.prenom} {r.Utilisateur?.nom} · {r.Utilisateur?.telephone}</p>
            <p>Du {new Date(r.date_debut).toLocaleDateString('fr-FR')} au {new Date(r.date_fin).toLocaleDateString('fr-FR')}</p>
            <p className="prix">{r.prix_total} €</p>
          </div>
          <div className="actions-statut">
            <span className={`badge badge-${r.statut}`}>{libelleStatut[r.statut]}</span>
            {r.statut === 'en_attente' && (
              <>
                <button onClick={() => changerStatut(r.id, 'confirmee')} className="btn btn-petit">Confirmer</button>
                <button onClick={() => changerStatut(r.id, 'annulee')} className="lien-supprimer">Annuler</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminReservations;