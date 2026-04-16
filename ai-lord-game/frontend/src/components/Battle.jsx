import { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = '/api';

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
    <div className="space-y-6 fade-in">
      <h2 className="text-3xl font-bold gold-text text-center decorative-border pb-6">
        ⚔️ 战斗系统 ⚔️
      </h2>

      <div className="parchment-card rounded-xl p-8 fade-in">
        <h3 className="text-2xl font-bold text-medieval-brown mb-6 text-center">
          🛡️ 准备战斗 🛡️
        </h3>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div>
            <label className="block text-lg font-medium text-medieval-dark mb-2">
              👹 敌人名称
            </label>
            <input
              type="text"
              value={enemyName}
              onChange={(e) => setEnemyName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-medieval-brown rounded-lg bg-medieval-parchment/50 text-medieval-dark focus:outline-none focus:border-medieval-gold transition-colors"
              placeholder="输入敌人名称"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-medieval-dark mb-2">
              💪 敌人强度 (1-10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={enemyStrength}
              onChange={(e) => setEnemyStrength(parseInt(e.target.value))}
              className="w-full px-4 py-3 border-2 border-medieval-brown rounded-lg bg-medieval-parchment/50 text-medieval-dark focus:outline-none focus:border-medieval-gold transition-colors"
            />
          </div>
          <button
            onClick={handleBattle}
            disabled={loading}
            className="w-full medieval-btn py-4 rounded-lg text-medieval-parchment font-bold text-xl"
          >
            {loading ? (
              <span className="pulse">⚔️ 战斗中...</span>
            ) : (
              <span>⚔️ 开始战斗 ⚔️</span>
            )}
          </button>
        </div>
      </div>

      {battleResult && (
        <div className="parchment-card rounded-xl p-8 fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-bold text-medieval-brown mb-6 text-center">
            📜 战斗结果 📜
          </h3>
          <div className="prose max-w-none">
            <div className="bg-medieval-parchment/50 rounded-lg p-6 border-2 border-medieval-brown">
              <p className="text-lg leading-relaxed text-medieval-dark whitespace-pre-line">
                {battleResult}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Battle;
