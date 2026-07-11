// pages/DetailVehicule.jsx - Fiche complète d'un véhicule + réservation
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DetailVehicule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicule, setVehicule] = useState(null);
  const [avis, setAvis] = useState([]);
  const [erreur, setErreur] = useState(null);

  // Champs de réservation
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [messageResa, setMessageResa] = useState(null);

  // L'utilisateur connecté (null si visiteur)
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

  useEffect(() => {
    axios.get(`http://localhost:3000/api/vehicules/${id}`)
      .then((reponse) => setVehicule(reponse.data))
      .catch(() => setErreur('Véhicule introuvable'));

    axios.get(`http://localhost:3000/api/avis/vehicule/${id}`)
      .then((reponse) => setAvis(reponse.data))
      .catch(() => {});
  }, [id]);

  // Calcul du prix total affiché en direct (comme sur la maquette)
  const calculerTotal = () => {
    if (!dateDebut || !dateFin || !vehicule) return null;
    const nbJours = Math.ceil((new Date(dateFin) - new Date(dateDebut)) / (1000 * 60 * 60 * 24)) + 1;
    if (nbJours <= 0) return null;
    return { nbJours, total: nbJours * vehicule.prix_jour };
  };
  const totalInfo = calculerTotal();

  // Envoi de la réservation à l'API
  const handleReservation = async (e) => {
    e.preventDefault();
    setMessageResa(null);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/reservations',
        { vehicule_id: vehicule.id, date_debut: dateDebut, date_fin: dateFin },
        { headers: { Authorization: `Bearer ${token}` } }   // on présente le bracelet
      );
      setMessageResa({ type: 'succes', texte: 'Réservation enregistrée ! Elle est en attente de confirmation.' });
      setDateDebut('');
      setDateFin('');
    } catch (err) {
      setMessageResa({ type: 'erreur', texte: err.response?.data?.message || 'Erreur lors de la réservation' });
    }
  };

  if (erreur) return <p className="message-erreur">{erreur}</p>;
  if (!vehicule) return <p>Chargement...</p>;

  return (
    <div className="detail-vehicule">
      <img className="detail-photo" src={vehicule.image_url} alt={`${vehicule.marque} ${vehicule.modele}`} />

      <h1>{vehicule.marque} {vehicule.modele}</h1>
      <p className="prix">{vehicule.prix_jour} € / jour</p>
      <p className="caracteristiques">
        {vehicule.nb_places} places · {vehicule.carburant} · {vehicule.annee}
      </p>
      <p className="description">{vehicule.description}</p>

      {/* Bloc réservation */}
      <div className="bloc-reservation">
        <h2>Réserver ce véhicule</h2>

        {/* Visiteur non connecté : invitation à se connecter */}
        {!utilisateur && (
          <p>
            <button className="btn" onClick={() => navigate('/connexion')}>
              Connectez-vous pour réserver
            </button>
          </p>
        )}

        {/* Client connecté : le formulaire de dates */}
        {utilisateur && (
          <form onSubmit={handleReservation}>
            <div className="champs-dates">
              <div>
                <label>Date de début</label>
                <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
              </div>
              <div>
                <label>Date de fin</label>
                <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} required />
              </div>
            </div>

            {/* Prix total affiché en direct */}
            {totalInfo && (
              <p className="total-resa">
                Total : <strong>{totalInfo.total} €</strong> ({totalInfo.nbJours} jour{totalInfo.nbJours > 1 ? 's' : ''})
              </p>
            )}

            {messageResa && (
              <p className={messageResa.type === 'succes' ? 'message-succes' : 'message-erreur'}>
                {messageResa.texte}
              </p>
            )}

            <button type="submit" className="btn btn-large">Réserver</button>
          </form>
        )}
      </div>

      {/* Avis clients */}
      <section className="section-avis">
        <h2>Avis des clients</h2>
        {avis.length === 0 && <p>Aucun avis pour le moment.</p>}
        {avis.map((a) => (
          <div key={a._id} className="carte-avis">
            <p className="note">{'★'.repeat(a.note)}{'☆'.repeat(5 - a.note)}</p>
            <p>{a.commentaire}</p>
            <p className="auteur">{a.nom_affichage}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default DetailVehicule;