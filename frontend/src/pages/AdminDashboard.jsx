// pages/AdminDashboard.jsx - Tableau de bord admin : gestion des véhicules
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminDashboard() {
  const [vehicules, setVehicules] = useState([]);
  const [message, setMessage] = useState(null);

  // Chargement du catalogue
  const chargerVehicules = () => {
    axios.get('http://localhost:3000/api/vehicules')
      .then((reponse) => setVehicules(reponse.data))
      .catch(() => setMessage('Erreur de chargement'));
  };

  useEffect(() => {
    chargerVehicules();
  }, []);

  // Suppression avec confirmation
  const handleSupprimer = async (id) => {
    if (!window.confirm('Supprimer ce véhicule ?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/vehicules/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      chargerVehicules();   // on recharge la liste
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la suppression');
    }
  };

  return (
    <div className="page-admin">
      <h1>Espace admin</h1>

      <div className="actions-admin">
        <Link to="/admin/vehicule" className="btn">+ Ajouter un véhicule</Link>
        <Link to="/admin/reservations" className="btn btn-secondaire">Voir les réservations</Link>
      </div>

      {message && <p className="message-erreur">{message}</p>}

      <h2>Mes véhicules</h2>
      {vehicules.map((v) => (
        <div key={v.id} className="ligne-vehicule">
          <img src={v.image_url} alt="" />
          <div className="ligne-infos">
            <h3>{v.marque} {v.modele}</h3>
            <p className="prix">{v.prix_jour} € / jour</p>
          </div>
          <div className="ligne-actions">
            <Link to={`/admin/vehicule/${v.id}`} className="lien-modifier">Modifier</Link>
            <button onClick={() => handleSupprimer(v.id)} className="lien-supprimer">Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;