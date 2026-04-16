import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// 组件
import GameState from './components/GameState';
import Resources from './components/Resources';
import Buildings from './components/Buildings';
import Tasks from './components/Tasks';
import Story from './components/Story';
import Battle from './components/Battle';
import Navigation from './components/Navigation';

// API基础URL
const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始化游戏状态
  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/game/state`);
        setGameState(response.data);
      } catch (error) {
        console.error('Error fetching game state:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameState();
  }, []);

  // 推进游戏天数
  const advanceDay = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/game/advance-day`);
      setGameState(response.data);
    } catch (error) {
      console.error('Error advancing day:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-bold text-primary">加载中...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        {/* 顶部状态栏 */}
        <header className="bg-primary text-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold fantasy-font">领主传奇</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="mr-2">第 {gameState.day} 天</span>
              </div>
              <button 
                onClick={advanceDay}
                className="bg-accent hover:bg-amber-600 text-white px-4 py-1 rounded-md transition-colors"
              >
                推进一天
              </button>
            </div>
          </div>
        </header>

        {/* 主要内容 */}
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧导航 */}
            <Navigation />
            
            {/* 右侧内容 */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6">
              <Routes>
                <Route path="/" element={<Navigate to="/game-state" />} />
                <Route path="/game-state" element={<GameState gameState={gameState} />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/buildings" element={<Buildings />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/story" element={<Story />} />
                <Route path="/battle" element={<Battle />} />
              </Routes>
            </div>
          </div>
        </main>

        {/* 底部信息 */}
        <footer className="bg-dark text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>领主传奇 - AI驱动的领主游戏</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
