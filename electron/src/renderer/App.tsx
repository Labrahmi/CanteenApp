import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddFunds from './pages/AddFunds';
import AmountSelection from './pages/AmountSelection';
import History from './pages/History';
import Home from './pages/Home';
import Pos from './pages/Pos';
import CardPlacement from './pages/CardPlacement';
import CardPlacementSuccess from './pages/cardPlacementSuccess';
import Login from './pages/Login';
import AmountSuccess from './pages/AmountSuccess';
import AppProvider from './providers/app';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<History />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-funds" element={<AddFunds />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/history" element={<History />} />
          <Route path="/card-placement" element={<CardPlacement />} />
          <Route path="/card-placement/success" element={<CardPlacementSuccess />} />
          <Route path="/card-placement/success/amount-selection" element={<AmountSelection />} />
          <Route path="/card-placement/success/amount-selection/success" element={<AmountSuccess />} />
          <Route path="*" element={
            <div className='p-16'>
              <h1 className='font-thin text-2xl'>404 Not Found</h1>
            </div>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}
