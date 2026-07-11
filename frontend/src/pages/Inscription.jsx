// pages/Inscription.jsx - Formulaire de création de compte
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Inscription() {
  const navigate = useNavigate();
  // Un seul state pour tous les champs du formulaire
  const [formulaire, setFormulaire] = useState({
    nom: '', prenom: '', email: '', mot_de_passe: '', telephone: '',
  });
  const [erreur, setErreur] = useState(null);

  // Mise à jour du state à chaque frappe
  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value });
  };

  // Envoi du formulaire à l'API
  const handleSubmit = async (e) => {
    e.preventDefault();   // empêche le rechargement de la page
    try {
      await axios.post('http://localhost:3000/api/auth/inscription', formulaire);
      navigate('/connexion');   // compte créé -> direction la connexion
    } catch (err) {
      setErreur(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="page-formulaire">
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit} className="formulaire">
        <label>Nom</label>
        <input type="text" name="nom" value={formulaire.nom} onChange={handleChange} required />

        <label>Prénom</label>
        <input type="text" name="prenom" value={formulaire.prenom} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formulaire.email} onChange={handleChange} required />

        <label>Téléphone</label>
        <input type="tel" name="telephone" value={formulaire.telephone} onChange={handleChange} />

        <label>Mot de passe</label>
        <input type="password" name="mot_de_passe" value={formulaire.mot_de_passe} onChange={handleChange} required minLength={6} />

        {erreur && <p className="message-erreur">{erreur}</p>}

        <button type="submit" className="btn">S'inscrire</button>
      </form>
      <p className="lien-bas">Déjà un compte ? <Link to="/connexion">Se connecter</Link></p>
    </div>
  );
}

export default Inscription;