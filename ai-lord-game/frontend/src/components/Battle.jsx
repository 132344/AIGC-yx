import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const Battle = () => {
  const [enemyName, setEnemyName] = useState('哥布林');
  const [enemyStrength, setEnemyStrength] = useState(5);
  const [battleResult, setBattleResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleBattle = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/battle`, {
        enemy_name: enemyName,
        enemy_strength: enemyStrength
      });
      setBattleResult(response.data.result);
    } catch (error) {
      console.error('Error generating battle:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary fantasy-font">战斗系统</h2>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              敌人名称
            </label>
            <input
              type="text"
              value={enemyName}
              onChange={(e) => setEnemyName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              敌人强度 (1-10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={enemyStrength}
              onChange={(e) => setEnemyStrength(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleBattle}
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors"
          >
            {loading ? '战斗中...' : '开始战斗'}
          </button>
        </div>
      </div>

      {battleResult && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-primary mb-3">战斗结果</h3>
          <div className="prose">
            <p>{battleResult}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Battle;
