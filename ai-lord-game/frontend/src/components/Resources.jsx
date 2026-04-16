import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/api';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/resources`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-2xl font-bold gold-text pulse">📦 加载资源中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-3xl font-bold gold-text text-center decorative-border pb-6">
        📦 资源管理 📦
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div
            key={resource.id}
            className="parchment-card rounded-xl p-6 fade-in hover:scale-105 transition-transform duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-medieval-brown">{resource.name}</h3>
              <span className="text-sm text-medieval-stone bg-medieval-parchment/50 px-3 py-1 rounded-full">
                {resource.type}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="resource-icon">
                {resource.name === '木材' && '🪵'}
                {resource.name === '石头' && '🪨'}
                {resource.name === '铁矿' && '⚙️'}
              </div>
              <div className="flex-1">
                <div className="text-3xl font-bold text-medieval-brown mb-2">
                  {resource.amount}
                </div>
                <div className="w-full bg-medieval-stone rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-medieval-gold h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((resource.amount / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="parchment-card rounded-xl p-6 fade-in" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-xl font-bold mb-4 text-medieval-brown border-b-2 border-medieval-brown pb-2">
          📜 资源说明
        </h3>
        <ul className="space-y-3 text-medieval-dark">
          <li className="flex items-start space-x-3">
            <span className="text-medieval-gold">🪵</span>
            <span><strong>木材：</strong>用于建筑建设和升级</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-medieval-gold">🪨</span>
            <span><strong>石头：</strong>用于建筑建设和升级</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-medieval-gold">⚙️</span>
            <span><strong>铁矿：</strong>用于高级建筑和武器制造</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-medieval-gold">💰</span>
            <span><strong>金币：</strong>用于各种交易和建设</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-medieval-gold">🍞</span>
            <span><strong>食物：</strong>维持人口生存和增长</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;
