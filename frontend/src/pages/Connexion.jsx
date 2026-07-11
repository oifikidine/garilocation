// pages/Connexion.jsx - Formulaire de connexion
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Connexion() {
  const navigate = useNavigate();
  const [formulaire, setFormulaire] = useState({ email: '', mot_de_passe: '' });
  const [erreur, setErreur] = useState(null);

  const handleChange = (e) => {
    setFormulaire({ ...formulaire, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await axios.post('http://localhost:3000/api/auth/connexion', formulaire);

      // On stocke le token et les infos utilisateur pour le reste de la session
      localStorage.setItem('token', reponse.data.token);
      localStorage.setItem('utilisateur', JSON.stringify(reponse.data.utilisateur));

      // Redirection selon le rôle (comme prévu dans le schéma d'enchaînement)
      if (reponse.data.utilisateur.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      window.location.reload();   // recharge pour mettre à jour le header
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="page-formulaire">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} className="formulaire">
        <label>Email</label>
        <input type="email" name="email" value={formulaire.email} onChange={handleChange} required />

        <label>Mot de passe</label>
        <input type="password" name="mot_de_passe" value={formulaire.mot_de_passe} onChange={handleChange} required />

        {erreur && <p className="message-erreur">{erreur}</p>}

        <button type="submit" className="btn">Se connecter</button>
      </form>
      <p className="lien-bas">Pas encore de compte ? <Link to="/inscription">S'inscrire</Link></p>
    </div>
  );
}

export default Connexion;