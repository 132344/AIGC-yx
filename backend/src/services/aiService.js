const axios = require('axios');
const config = require('../../config/config');

class AIService {
  constructor() {
    this.apiKey = config.minimax.apiKey;
    this.model = config.minimax.model;
    this.baseUrl = config.minimax.baseUrl;
  }

  async generateStory(prompt, context = '') {
    try {
      const response = await axios.post(this.baseUrl, {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: '你是一个领主游戏的剧情生成器，根据用户的选择生成相应的游戏剧情。剧情应该丰富、有代入感，符合中世纪领主题材的设定。'
          },
          {
            role: 'user',
            content: `背景：${context}\n选择：${prompt}\n请生成接下来的剧情，以及3个可能的选择。`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('AI API调用失败:', error);
      // 失败时返回默认剧情
      return `你选择了：${prompt}。随着你的选择，领地的发展方向发生了变化...\n\n选择：\n1. 继续发展经济\n2. 加强军事力量\n3. 开展外交活动`;
    }
  }
}

module.exports = new AIService();