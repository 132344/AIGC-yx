import os
import requests
from dotenv import load_dotenv
import random

# 加载环境变量
load_dotenv()

class AIService:
    def __init__(self):
        self.api_key = os.getenv('MINIMAX_API_KEY')
        self.api_url = os.getenv('MINIMAX_API_URL')
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
        self.has_valid_key = self.api_key and self.api_key != 'your_api_key_here'
    
    def generate_story(self, prompt):
        """生成游戏剧情"""
        if not self.has_valid_key:
            return self._get_fallback_story(prompt)
        
        payload = {
            'model': 'abab5.5-chat',
            'messages': [
                {
                    'role': 'user',
                    'content': prompt
                }
            ],
            'temperature': 0.7,
            'max_tokens': 1000
        }
        
        try:
            response = requests.post(self.api_url, json=payload, headers=self.headers)
            response.raise_for_status()
            result = response.json()
            return result['choices'][0]['message']['content']
        except Exception as e:
            print(f"Error generating story: {e}")
            return self._get_fallback_story(prompt)
    
    def _get_fallback_story(self, prompt):
        """获取备用剧情内容"""
        fallback_stories = [
            "你的领地迎来了新的一天，阳光明媚，村民们都在忙碌地工作着。",
            "远方的商队带来了新奇的商品和有趣的消息。",
            "一位神秘的旅行者来到了你的领地，似乎有重要的事情要告诉你。",
            "天空中出现了奇异的征兆，预示着即将发生重大事件。",
        ]
        return random.choice(fallback_stories)
    
    def generate_character_dialogue(self, character, context, prompt):
        """生成角色对话"""
        if not self.has_valid_key:
            return f"{character}说：愿领主大人繁荣昌盛！"
        
        full_prompt = f"角色{character}在{context}场景下，{prompt}"
        return self.generate_story(full_prompt)
    
    def generate_battle_result(self, battle_context):
        """生成战斗结果"""
        if not self.has_valid_key:
            return self._get_fallback_battle_result()
        
        prompt = f"作为游戏AI，根据以下战斗场景生成战斗结果：{battle_context}"
        return self.generate_story(prompt)
    
    def _get_fallback_battle_result(self):
        """获取备用战斗结果"""
        results = [
            "⚔️ 胜利！你的军队英勇作战，成功击败了敌人！获得了100金币和10士气。",
            "🛡️ 平局！双方势均力敌，战斗陷入胶着状态。",
            "💀 失败！敌人太强大了，你的军队损失惨重。失去了50金币、50食物和10士气。",
        ]
        return random.choice(results)
    
    def generate_resource_advice(self, resources):
        """生成资源管理建议"""
        if not self.has_valid_key:
            return "建议优先发展农业，确保食物供应充足，然后再考虑其他建设。"
        
        prompt = f"作为游戏AI，根据以下资源情况提供管理建议：{resources}"
        return self.generate_story(prompt)
