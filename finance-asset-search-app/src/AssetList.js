import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const mockStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 150.25, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 305.50, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3380.20, sector: 'Consumer Cyclical' },
  { symbol: 'FB', name: 'Meta Platforms Inc.', price: 330.15, sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 750.60, sector: 'Consumer Cyclical' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 220.75, sector: 'Technology' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 160.40, sector: 'Financial Services' },
  { symbol: 'V', name: 'Visa Inc.', price: 230.90, sector: 'Financial Services' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 170.55, sector: 'Healthcare' },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 140.80, sector: 'Consumer Defensive' },
  { symbol: 'PG', name: 'Procter & Gamble Co.', price: 141.70, sector: 'Consumer Defensive' },
  { symbol: 'MA', name: 'Mastercard Inc.', price: 350.25, sector: 'Financial Services' },
  { symbol: 'UNH', name: 'UnitedHealth Group Inc.', price: 410.60, sector: 'Healthcare' },
  { symbol: 'HD', name: 'Home Depot Inc.', price: 330.40, sector: 'Consumer Cyclical' },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 175.30, sector: 'Communication Services' },
  { symbol: 'ADBE', name: 'Adobe Inc.', price: 630.20, sector: 'Technology' },
  { symbol: 'CRM', name: 'Salesforce.com Inc.', price: 260.85, sector: 'Technology' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 590.50, sector: 'Communication Services' },
  { symbol: 'CMCSA', name: 'Comcast Corporation', price: 55.70, sector: 'Communication Services' },
  { symbol: 'PFE', name: 'Pfizer Inc.', price: 45.60, sector: 'Healthcare' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.', price: 55.80, sector: 'Technology' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', price: 155.40, sector: 'Consumer Defensive' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', price: 115.20, sector: 'Healthcare' },
  { symbol: 'KO', name: 'Coca-Cola Co.', price: 55.65, sector: 'Consumer Defensive' },
  { symbol: 'ACN', name: 'Accenture Plc', price: 320.30, sector: 'Technology' },
  { symbol: 'AVGO', name: 'Broadcom Inc.', price: 485.70, sector: 'Technology' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific Inc.', price: 510.40, sector: 'Healthcare' },
  { symbol: 'COST', name: 'Costco Wholesale Corporation', price: 460.80, sector: 'Consumer Defensive' },
  { symbol: 'MRK', name: 'Merck & Co. Inc.', price: 75.90, sector: 'Healthcare' },
];

function AssetList({ favorites, toggleFavorite }) {
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sector, setSector] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setAssets(mockStocks);
  }, []);

  const sectors = ['All', ...new Set(mockStocks.map(stock => stock.sector))];

  const filteredAssets = assets.filter(asset =>
    (asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (sector === 'All' || asset.sector === sector) &&
    asset.price >= priceRange.min &&
    asset.price <= priceRange.max
  );

  const sortedAssets = filteredAssets.sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'symbol') {
      return sortOrder === 'asc' ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol);
    } else if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Asset List</h1>
      <div className="mb-4 flex flex-wrap items-center">
        <input
          type="text"
          placeholder="Search assets..."
          className="p-2 border rounded mr-2 mb-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded mr-2 mb-2"
          value={sector}
          onChange={(e) => setSector(e.target.value)}
        >
          {sectors.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="p-2 border rounded mr-2 mb-2 w-24"
          onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="p-2 border rounded mr-2 mb-2 w-24"
          onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || Infinity }))}
        />
      </div>
      <Link to="/favorites" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        View Favorites ({favorites.length})
      </Link>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => handleSort('name')}>Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th className="cursor-pointer" onClick={() => handleSort('symbol')}>Symbol {sortBy === 'symbol' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th className="cursor-pointer" onClick={() => handleSort('price')}>Price {sortBy === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
            <th>Sector</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssets.map((asset) => (
            <tr key={asset.symbol} className="border-b">
              <td className="py-2">{asset.name}</td>
              <td>{asset.symbol}</td>
              <td>${asset.price.toFixed(2)}</td>
              <td>{asset.sector}</td>
              <td>
                <button
                  onClick={() => toggleFavorite(asset)}
                  className={`px-3 py-1 rounded ${
                    favorites.some(fav => fav.symbol === asset.symbol)
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {favorites.some(fav => fav.symbol === asset.symbol) ? 'Unfavorite' : 'Favorite'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssetList;