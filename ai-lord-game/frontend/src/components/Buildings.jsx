import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/api';

const Buildings = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/buildings`);
        setBuildings(response.data);
      } catch (error) {
        console.error('Error fetching buildings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const handleBuild = async (buildingId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/buildings/build/${buildingId}`);
      setMessage(response.data.message);
      const buildingsResponse = await axios.get(`${API_BASE_URL}/buildings`);
      setBuildings(buildingsResponse.data);
    } catch (error) {
      console.error('Error building:', error);
    }
  };

  const handleUpgrade = async (buildingId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/buildings/upgrade/${buildingId}`);
      setMessage(response.data.message);
      const buildingsResponse = await axios.get(`${API_BASE_URL}/buildings`);
      setBuildings(buildingsResponse.data);
    } catch (error) {
      console.error('Error upgrading:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-2xl font-bold gold-text pulse">🏗️ 加载建筑中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-3xl font-bold gold-text text-center decorative-border pb-6">
        🏗️ 建筑系统 🏗️
      </h2>

      {message && (
        <div className="parchment-card rounded-lg p-4 text-medieval-dark text-center font-medium fade-in">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {buildings.map((building, index) => (
          <div
            key={building.id}
            className={`parchment-card rounded-xl p-6 transition-all duration-300 hover:shadow-xl fade-in ${building.is_built ? 'border-medieval-gold' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-medieval-brown">{building.name}</h3>
              {building.is_built && (
                <span className="bg-medieval-gold text-medieval-dark px-3 py-1 rounded-full text-sm font-bold">
                  ⭐ 等级 {building.level}
                </span>
              )}
            </div>
            <p className="text-medieval-stone mb-4 leading-relaxed">{building.effect}</p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-medieval-stone">
                <div className="flex items-center space-x-2">
                  <span>💰</span>
                  <span>{building.cost_gold} 金币</span>
                  <span>🍞</span>
                  <span>{building.cost_food} 食物</span>
                </div>
              </div>
              <div className="w-full sm:w-auto">
                {!building.is_built ? (
                  <button
                    onClick={() => handleBuild(building.id)}
                    className="medieval-btn w-full sm:w-auto px-6 py-2 rounded-lg text-medieval-parchment font-bold"
                  >
                    🔨 建造
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(building.id)}
                    className="medieval-btn w-full sm:w-auto px-6 py-2 rounded-lg text-medieval-parchment font-bold"
                  >
                    ⬆️ 升级
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Buildings;
