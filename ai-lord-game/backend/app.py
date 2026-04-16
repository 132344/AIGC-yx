from flask import Flask, jsonify, request
from flask_cors import CORS
from game_service import GameService

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 初始化游戏服务
game_service = GameService()

# 游戏状态相关接口
@app.route('/api/game/state', methods=['GET'])
def get_game_state():
    game_state = game_service.get_game_state()
    return jsonify({
        'day': game_state.day,
        'gold': game_state.gold,
        'food': game_state.food,
        'population': game_state.population,
        'morale': game_state.morale
    })

# 资源相关接口
@app.route('/api/resources', methods=['GET'])
def get_resources():
    resources = game_service.get_resources()
    return jsonify([
        {
            'id': resource.id,
            'name': resource.name,
            'amount': resource.amount,
            'type': resource.type
        }
        for resource in resources
    ])

# 建筑相关接口
@app.route('/api/buildings', methods=['GET'])
def get_buildings():
    buildings = game_service.get_buildings()
    return jsonify([
        {
            'id': building.id,
            'name': building.name,
            'level': building.level,
            'effect': building.effect,
            'cost_gold': building.cost_gold,
            'cost_food': building.cost_food,
            'is_built': building.is_built
        }
        for building in buildings
    ])

@app.route('/api/buildings/build/<int:building_id>', methods=['POST'])
def build_building(building_id):
    success, message = game_service.build_building(building_id)
    return jsonify({'success': success, 'message': message})

@app.route('/api/buildings/upgrade/<int:building_id>', methods=['POST'])
def upgrade_building(building_id):
    success, message = game_service.upgrade_building(building_id)
    return jsonify({'success': success, 'message': message})

# 角色相关接口
@app.route('/api/characters', methods=['GET'])
def get_characters():
    characters = game_service.get_characters()
    return jsonify([
        {
            'id': character.id,
            'name': character.name,
            'type': character.type,
            'level': character.level,
            'skills': character.skills,
            'loyalty': character.loyalty
        }
        for character in characters
    ])

# 任务相关接口
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = game_service.get_tasks()
    return jsonify([
        {
            'id': task.id,
            'title': task.title,
            'description': task.description,
            'reward_gold': task.reward_gold,
            'reward_food': task.reward_food,
            'reward_population': task.reward_population,
            'is_completed': task.is_completed
        }
        for task in tasks
    ])

@app.route('/api/tasks/complete/<int:task_id>', methods=['POST'])
def complete_task(task_id):
    success, message = game_service.complete_task(task_id)
    return jsonify({'success': success, 'message': message})

# 剧情相关接口
@app.route('/api/stories/current', methods=['GET'])
def get_current_story():
    story = game_service.get_current_story()
    if not story:
        return jsonify({'error': '没有当前剧情'})
    return jsonify({
        'id': story.id,
        'title': story.title,
        'content': story.content,
        'choices': story.choices
    })

@app.route('/api/stories/progress/<int:story_id>', methods=['POST'])
def progress_story(story_id):
    data = request.get_json()
    choice_index = data.get('choice_index')
    success, message = game_service.progress_story(story_id, choice_index)
    return jsonify({'success': success, 'message': message})

# 战斗相关接口
@app.route('/api/battle', methods=['POST'])
def generate_battle():
    data = request.get_json()
    enemy_name = data.get('enemy_name', ' Goblin')
    enemy_strength = data.get('enemy_strength', 5)
    result = game_service.generate_battle(enemy_name, enemy_strength)
    return jsonify({'result': result})

# 游戏进程相关接口
@app.route('/api/game/advance-day', methods=['POST'])
def advance_day():
    game_state = game_service.advance_day()
    return jsonify({
        'day': game_state.day,
        'gold': game_state.gold,
        'food': game_state.food,
        'population': game_state.population,
        'morale': game_state.morale
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
