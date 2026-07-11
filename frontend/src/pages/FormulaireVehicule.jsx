// pages/FormulaireVehicule.jsx - Ajout OU modification d'un véhicule (admin)
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormulaireVehicule() {
  const { id } = useParams();          // présent = modification, absent = ajout
  const navigate = useNavigate();
  const [formulaire, setFormulaire] = useState({
    marque: '', modele: '', annee: '', prix_jour: '', nb_places: '',
    carburant: '', description: '', image_url: '',
  });
  const [erreur, setErreur] = useState(null);

  // En mode modification : on pré-remplit avec les données existantes
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/vehicules/${id}`)
        .then((reponse) => setFormulaire(reponse.data))
        .catch(() => setErreur('Véhicule introuvable'));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (id) {
        // Modification
        await axios.put(`http://localhost:3000/api/vehicules/${id}`, formulaire, config);
      } else {
        // Création
        await axios.post('http://localhost:3000/api/vehicules', formulaire, config);
      }
      navigate('/admin');
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur lors de l'enregistrement");
    }
  };

  return (
    <div className="page-formulaire">
      <h1>{id ? 'Modifier le véhicule' : 'Ajouter un véhicule'}</h1>
      <form onSubmit={handleSubmit} className="formulaire">
        <label>Marque</label>
        <input type="text" name="marque" value={formulaire.marque} onChange={handleChange} required />

        <label>Modèle</label>
        <input type="text" name="modele" value={formulaire.modele} onChange={handleChange} required />

        <label>Année</label>
        <input type="number" name="annee" value={formulaire.annee} onChange={handleChange} />

        <label>Prix par jour (€)</label>
        <input type="number" step="0.01" name="prix_jour" value={formulaire.prix_jour} onChange={handleChange} required />

        <label>Nombre de places</label>
        <input type="number" name="nb_places" value={formulaire.nb_places} onChange={handleChange} />

        <label>Carburant</label>
        <input type="text" name="carburant" value={formulaire.carburant} onChange={handleChange} />

        <label>Description</label>
        <input type="text" name="description" value={formulaire.description} onChange={handleChange} />

        <label>URL de la photo</label>
        <input type="text" name="image_url" value={formulaire.image_url} onChange={handleChange} />

        {erreur && <p className="message-erreur">{erreur}</p>}

        <button type="submit" className="btn">{id ? 'Enregistrer les modifications' : 'Ajouter le véhicule'}</button>
      </form>
    </div>
  );
}

export default FormulaireVehicule;