import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

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
    return <div className="text-center py-8">加载资源中...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary fantasy-font">资源管理</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-primary">{resource.name}</h3>
              <span className="text-sm text-gray-500">{resource.type}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{resource.amount}</span>
              <div className="flex-1 ml-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${Math.min((resource.amount / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2 text-primary">资源说明</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>木材：用于建筑建设和升级</li>
          <li>石头：用于建筑建设和升级</li>
          <li>铁矿：用于高级建筑和武器制造</li>
          <li>金币：用于各种交易和建设</li>
          <li>食物：维持人口生存和增长</li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;
