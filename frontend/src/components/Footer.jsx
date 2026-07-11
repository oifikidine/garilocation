// components/Footer.jsx
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <span>GARILocation</span>
      <nav>
        <Link to="/contenu-a-venir">Contact</Link>
        <Link to="/contenu-a-venir">À propos</Link>
      </nav>
    </footer>
  );
}

export default Footer;