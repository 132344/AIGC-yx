import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const Story = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCurrentStory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/stories/current`);
        setStory(response.data);
      } catch (error) {
        console.error('Error fetching story:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentStory();
  }, []);

  const handleChoice = async (choiceIndex) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/stories/progress/${story.id}`, {
        choice_index: choiceIndex
      });
      setMessage(response.data.message);
      // 重新获取当前剧情
      const storyResponse = await axios.get(`${API_BASE_URL}/stories/current`);
      setStory(storyResponse.data);
    } catch (error) {
      console.error('Error progressing story:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">加载剧情中...</div>;
  }

  if (!story) {
    return <div className="text-center py-8 text-gray-500">暂无剧情</div>;
  }

  const choices = JSON.parse(story.choices);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary fantasy-font">剧情系统</h2>
      
      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 p-4 rounded-md">
          {message}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-primary mb-4 fantasy-font">{story.title}</h3>
        <div className="prose mb-6">
          <p>{story.content}</p>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">选择你的行动：</h4>
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => handleChoice(index)}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 transition-colors"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;
