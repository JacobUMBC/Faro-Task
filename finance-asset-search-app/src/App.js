import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import AssetList from './AssetList';
import FavoritesList from './FavoritesList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const login = (email, password) => {
    // Implement your login logic here
    setIsLoggedIn(true);
    return true;
  };

  const toggleFavorite = (asset) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.symbol === asset.symbol)) {
        return prevFavorites.filter(fav => fav.symbol !== asset.symbol);
      } else {
        return [...prevFavorites, asset];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/assets"
          element={
            isLoggedIn ? (
              <AssetList favorites={favorites} toggleFavorite={toggleFavorite} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/favorites"
          element={
            isLoggedIn ? (
              <FavoritesList favorites={favorites} toggleFavorite={toggleFavorite} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/assets" />} />
      </Routes>
    </Router>
  );
}

export default App;
