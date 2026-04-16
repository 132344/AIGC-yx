import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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
      // 重新获取建筑列表
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
      // 重新获取建筑列表
      const buildingsResponse = await axios.get(`${API_BASE_URL}/buildings`);
      setBuildings(buildingsResponse.data);
    } catch (error) {
      console.error('Error upgrading:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">加载建筑中...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary fantasy-font">建筑系统</h2>
      
      {message && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {buildings.map((building) => (
          <div key={building.id} className={`p-4 rounded-lg border ${building.is_built ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-primary">{building.name}</h3>
              {building.is_built && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  等级 {building.level}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{building.effect}</p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                成本: {building.cost_gold} 金币, {building.cost_food} 食物
              </div>
              <div className="space-x-2">
                {!building.is_built ? (
                  <button 
                    onClick={() => handleBuild(building.id)}
                    className="bg-primary hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    建造
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpgrade(building.id)}
                    className="bg-accent hover:bg-amber-600 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    升级
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
