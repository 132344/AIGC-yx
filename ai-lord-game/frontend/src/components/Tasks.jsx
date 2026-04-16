import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

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
      // 重新获取任务列表
      const tasksResponse = await axios.get(`${API_BASE_URL}/tasks`);
      setTasks(tasksResponse.data);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">加载任务中...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary fantasy-font">任务系统</h2>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-md">
          {message}
        </div>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className={`p-4 rounded-lg border ${task.is_completed ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'}`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-1">{task.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                <div className="flex flex-wrap gap-2">
                  {task.reward_gold > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      +{task.reward_gold} 金币
                    </span>
                  )}
                  {task.reward_food > 0 && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      +{task.reward_food} 食物
                    </span>
                  )}
                  {task.reward_population > 0 && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      +{task.reward_population} 人口
                    </span>
                  )}
                </div>
              </div>
              {!task.is_completed && (
                <button 
                  onClick={() => handleComplete(task.id)}
                  className="bg-accent hover:bg-amber-600 text-white px-4 py-2 rounded transition-colors"
                >
                  完成任务
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          暂无可用任务
        </div>
      )}
    </div>
  );
};

export default Tasks;
