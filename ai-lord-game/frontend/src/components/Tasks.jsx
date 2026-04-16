import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/api';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleComplete = async (taskId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/complete/${taskId}`);
      setMessage(response.data.message);
      const tasksResponse = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-2xl font-bold gold-text pulse">📜 加载任务中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-3xl font-bold gold-text text-center decorative-border pb-6">
        📜 任务系统 📜
      </h2>

      {message && (
        <div className="parchment-card rounded-lg p-4 text-medieval-dark text-center font-medium fade-in">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`parchment-card rounded-xl p-6 transition-all duration-300 fade-in ${task.is_completed ? 'opacity-60' : 'hover:shadow-xl'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {task.is_completed ? (
                  <span className="text-green-600 text-2xl">✅</span>
                ) : (
                  <span className="text-medieval-brown text-2xl">📋</span>
                )}
                  <h3 className="text-xl font-bold text-medieval-brown">
                    {task.title}
                  </h3>
                </div>
                <p className="text-medieval-stone mb-4">{task.description}</p>
                <div className="flex flex-wrap gap-2">
                  {task.reward_gold > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                      <span>💰</span>
                      <span>+{task.reward_gold} 金币</span>
                    </span>
                  )}
                  {task.reward_food > 0 && (
                    <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                      <span>🍞</span>
                      <span>+{task.reward_food} 食物</span>
                    </span>
                  )}
                  {task.reward_population > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                      <span>👥</span>
                      <span>+{task.reward_population} 人口</span>
                    </span>
                  )}
                </div>
              </div>
              {!task.is_completed && (
                <button
                  onClick={() => handleComplete(task.id)}
                  className="medieval-btn px-6 py-3 rounded-lg text-medieval-parchment font-bold"
                >
                  ✨ 完成任务
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="parchment-card rounded-xl p-8 text-center fade-in">
          <div className="text-4xl mb-4">📭</div>
          <div className="text-xl text-medieval-stone">暂无可用任务</div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
