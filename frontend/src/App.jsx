import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Accueil from './pages/Accueil';
import DetailVehicule from './pages/DetailVehicule';
import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import MesReservations from './pages/MesReservations';
import AdminDashboard from './pages/AdminDashboard';
import AdminReservations from './pages/AdminReservations';
import FormulaireVehicule from './pages/FormulaireVehicule';
import ContenuAVenir from './pages/ContenuAVenir';
import Page404 from './pages/Page404';

import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <BrowserRouter>
      <Header />                                    
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/vehicule/:id" element={<DetailVehicule />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/reservations" element={<AdminReservations />} />
        <Route path="/admin/vehicule" element={<FormulaireVehicule />} />
        <Route path="/admin/vehicule/:id" element={<FormulaireVehicule />} />
        <Route path="/contenu-a-venir" element={<ContenuAVenir />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />                                    
    </BrowserRouter>
  );
}

export default App;