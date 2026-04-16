import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = '/api';

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
      const storyResponse = await axios.get(`${API_BASE_URL}/stories/current`);
      setStory(storyResponse.data);
    } catch (error) {
      console.error('Error progressing story:', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-2xl font-bold gold-text pulse">📖 加载剧情中...</div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="parchment-card rounded-xl p-8 text-center fade-in">
        <div className="text-4xl mb-4">📜</div>
        <div className="text-xl text-medieval-stone">暂无剧情</div>
      </div>
    );
  }

  const choices = JSON.parse(story.choices);

  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-3xl font-bold gold-text text-center decorative-border pb-6">
        📖 剧情系统 📖
      </h2>

      {message && (
        <div className="parchment-card rounded-lg p-4 text-medieval-dark text-center font-medium fade-in">
          {message}
        </div>
      )}

      <div className="parchment-card rounded-xl p-8 fade-in">
        <h3 className="text-2xl font-bold text-medieval-brown mb-6 text-center">
          {story.title}
        </h3>
        <div className="prose max-w-none mb-8">
          <p className="text-lg leading-relaxed text-medieval-dark">
            {story.content}
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-semibold text-xl text-medieval-brown text-center">
            ⚔️ 选择你的行动 ⚔️
          </h4>
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className="w-full text-left p-4 parchment-card rounded-lg hover:border-medieval-gold transition-all duration-300 hover:scale-[1.02] border-2"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl text-medieval-gold">⚜️</span>
                  <span className="text-lg font-medium text-medieval-dark">
                    {choice.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
