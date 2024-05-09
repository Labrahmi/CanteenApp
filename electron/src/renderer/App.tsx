import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddFunds from './pages/AddFunds';
import AmountSelection from './pages/AmountSelection';
import EditCard from './pages/EditCard';
import Home from './pages/Home';
import RegiserCard from './pages/RegisterCard';
import CardPlacement from './pages/cardPlacement';
import CardPlacementSuccess from './pages/cardPlacementSuccess';
import Login from './pages/Login';
import AmountSuccess from './pages/AmountSuccess';
//
import AppProvider from './providers/app';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/*  */}
          <Route path="/home" element={<Home />} />
          {/*  */}
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/register-card" element={<RegiserCard />} />
          <Route path="/edit-card" element={<EditCard />} />
          {/*  */}
          <Route path="/card-placement" element={<CardPlacement />} />
          <Route path="/card-placement/success" element={<CardPlacementSuccess />} />
          <Route path="/card-placement/success/amount-selection" element={<AmountSelection />} />
          <Route path="/card-placement/success/amount-selection/success" element={<AmountSuccess />} />
          {/*  */}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
