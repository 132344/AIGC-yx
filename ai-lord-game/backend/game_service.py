from models import session, GameState, Building, Character, Resource, Task, Story
from ai_service import AIService

class GameService:
    def __init__(self):
        self.ai_service = AIService()
    
    def get_game_state(self):
        """获取游戏状态"""
        return session.query(GameState).first()
    
    def update_game_state(self, **kwargs):
        """更新游戏状态"""
        game_state = self.get_game_state()
        for key, value in kwargs.items():
            if hasattr(game_state, key):
                setattr(game_state, key, value)
        session.commit()
        return game_state
    
    def get_resources(self):
        """获取所有资源"""
        return session.query(Resource).all()
    
    def update_resource(self, name, amount):
        """更新资源数量"""
        resource = session.query(Resource).filter_by(name=name).first()
        if resource:
            resource.amount += amount
            session.commit()
        return resource
    
    def get_buildings(self):
        """获取所有建筑"""
        return session.query(Building).all()
    
    def build_building(self, building_id):
        """建造建筑"""
        building = session.query(Building).get(building_id)
        if not building:
            return False, "建筑不存在"
        
        game_state = self.get_game_state()
        if game_state.gold < building.cost_gold or game_state.food < building.cost_food:
            return False, "资源不足"
        
        # 扣除资源
        game_state.gold -= building.cost_gold
        game_state.food -= building.cost_food
        building.is_built = True
        session.commit()
        
        return True, "建筑建造成功"
    
    def upgrade_building(self, building_id):
        """升级建筑"""
        building = session.query(Building).get(building_id)
        if not building or not building.is_built:
            return False, "建筑不存在或未建造"
        
        game_state = self.get_game_state()
        upgrade_cost_gold = building.cost_gold * (building.level + 1)
        upgrade_cost_food = building.cost_food * (building.level + 1)
        
        if game_state.gold < upgrade_cost_gold or game_state.food < upgrade_cost_food:
            return False, "资源不足"
        
        # 扣除资源
        game_state.gold -= upgrade_cost_gold
        game_state.food -= upgrade_cost_food
        building.level += 1
        session.commit()
        
        return True, "建筑升级成功"
    
    def get_characters(self):
        """获取所有角色"""
        return session.query(Character).all()
    
    def get_tasks(self):
        """获取所有任务"""
        return session.query(Task).filter_by(is_available=True).all()
    
    def complete_task(self, task_id):
        """完成任务"""
        task = session.query(Task).get(task_id)
        if not task or not task.is_available or task.is_completed:
            return False, "任务不存在或已完成"
        
        game_state = self.get_game_state()
        # 发放奖励
        game_state.gold += task.reward_gold
        game_state.food += task.reward_food
        game_state.population += task.reward_population
        task.is_completed = True
        session.commit()
        
        return True, "任务完成，获得奖励"
    
    def get_stories(self):
        """获取所有剧情"""
        return session.query(Story).all()
    
    def get_current_story(self):
        """获取当前剧情"""
        return session.query(Story).filter_by(is_completed=False).first()
    
    def progress_story(self, story_id, choice_index):
        """推进剧情"""
        import json
        story = session.query(Story).get(story_id)
        if not story:
            return False, "剧情不存在"
        
        choices = json.loads(story.choices)
        if choice_index < 0 or choice_index >= len(choices):
            return False, "选择无效"
        
        choice = choices[choice_index]
        next_story_id = choice.get('next_story_id')
        
        # 标记当前剧情为已完成
        story.is_completed = True
        
        # 如果有下一个剧情，创建并返回
        if next_story_id:
            # 这里可以通过AI生成新的剧情内容
            prompt = f"基于上一个剧情选择，生成新的剧情内容，选择是：{choice['text']}"
            new_content = self.ai_service.generate_story(prompt)
            
            # 生成新的选择
            choices_prompt = f"基于剧情内容，生成2-3个选择选项：{new_content}"
            choices_text = self.ai_service.generate_story(choices_prompt)
            
            # 简化处理，实际项目中需要解析AI生成的选择
            new_choices = [
                {"text": "继续建设领地", "next_story_id": next_story_id + 1},
                {"text": "与周边势力外交", "next_story_id": next_story_id + 2}
            ]
            
            new_story = Story(
                title=f"剧情 {next_story_id}",
                content=new_content,
                choices=json.dumps(new_choices),
                is_completed=False
            )
            session.add(new_story)
        
        session.commit()
        return True, "剧情推进成功"
    
    def generate_battle(self, enemy_name, enemy_strength):
        """生成战斗"""
        game_state = self.get_game_state()
        battle_context = f"玩家领主与{enemy_name}战斗，敌方强度{enemy_strength}，我方资源：金币{game_state.gold}，食物{game_state.food}，人口{game_state.population}"
        
        # 使用AI生成战斗结果
        battle_result = self.ai_service.generate_battle_result(battle_context)
        
        # 根据战斗结果更新游戏状态
        # 这里简化处理，实际项目中需要解析AI生成的战斗结果
        if "胜利" in battle_result:
            game_state.gold += 100
            game_state.morale += 10
        else:
            game_state.gold -= 50
            game_state.food -= 50
            game_state.morale -= 10
        
        session.commit()
        return battle_result
    
    def advance_day(self):
        """推进游戏天数"""
        game_state = self.get_game_state()
        game_state.day += 1
        
        # 每天自动生产资源
        buildings = session.query(Building).filter_by(is_built=True).all()
        for building in buildings:
            if building.name == '农场':
                game_state.food += 100 * building.level
            elif building.name == '伐木场':
                wood = session.query(Resource).filter_by(name='木材').first()
                if wood:
                    wood.amount += 50 * building.level
            elif building.name == '采石场':
                stone = session.query(Resource).filter_by(name='石头').first()
                if stone:
                    stone.amount += 30 * building.level
            elif building.name == '铁矿':
                iron = session.query(Resource).filter_by(name='铁矿').first()
                if iron:
                    iron.amount += 20 * building.level
        
        # 人口消耗食物
        food_consumption = game_state.population // 10
        game_state.food -= food_consumption
        
        # 人口自然增长
        if game_state.food > 0:
            game_state.population += 1
        
        session.commit()
        return game_state
