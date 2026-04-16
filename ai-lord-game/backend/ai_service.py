import os
import requests
from dotenv import load_dotenv

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
    
    def generate_story(self, prompt):
        """生成游戏剧情"""
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
            return "剧情生成失败，请重试"
    
    def generate_character_dialogue(self, character, context, prompt):
        """生成角色对话"""
        full_prompt = f"角色{character}在{context}场景下，{prompt}"
        return self.generate_story(full_prompt)
    
    def generate_battle_result(self, battle_context):
        """生成战斗结果"""
        prompt = f"作为游戏AI，根据以下战斗场景生成战斗结果：{battle_context}"
        return self.generate_story(prompt)
    
    def generate_resource_advice(self, resources):
        """生成资源管理建议"""
        prompt = f"作为游戏AI，根据以下资源情况提供管理建议：{resources}"
        return self.generate_story(prompt)
