import React from 'react';
import { Link } from 'react-router-dom';

function FavoritesList({ favorites, toggleFavorite }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Favorites List</h1>
      <Link to="/assets" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Back to Asset List
      </Link>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You haven't added any favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((asset) => (
            <li key={asset.symbol} className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{asset.name}</h2>
                <p className="text-gray-600">{asset.symbol}</p>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-4">${asset.price.toFixed(2)}</span>
                <button
                  onClick={() => toggleFavorite(asset)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Unfavorite
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesList;