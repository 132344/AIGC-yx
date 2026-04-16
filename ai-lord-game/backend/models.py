from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 创建SQLite引擎
engine = create_engine('sqlite:///game.db', echo=True)
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

class GameState(Base):
    """游戏状态模型"""
    __tablename__ = 'game_state'
    id = Column(Integer, primary_key=True)
    day = Column(Integer, default=1)
    gold = Column(Integer, default=1000)
    food = Column(Integer, default=1000)
    population = Column(Integer, default=100)
    morale = Column(Integer, default=70)

class Building(Base):
    """建筑模型"""
    __tablename__ = 'buildings'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    level = Column(Integer, default=1)
    effect = Column(Text)
    cost_gold = Column(Integer)
    cost_food = Column(Integer)
    is_built = Column(Boolean, default=False)

class Character(Base):
    """角色模型"""
    __tablename__ = 'characters'
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    type = Column(String(50))  # 领主、英雄、NPC等
    level = Column(Integer, default=1)
    skills = Column(Text)
    loyalty = Column(Integer, default=50)

class Resource(Base):
    """资源模型"""
    __tablename__ = 'resources'
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    amount = Column(Integer, default=0)
    type = Column(String(50))  # 基础资源、特殊资源等

class Task(Base):
    """任务模型"""
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    reward_gold = Column(Integer, default=0)
    reward_food = Column(Integer, default=0)
    reward_population = Column(Integer, default=0)
    is_completed = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)

class Story(Base):
    """剧情模型"""
    __tablename__ = 'stories'
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    content = Column(Text)
    choices = Column(Text)  # JSON格式存储选项
    next_story_id = Column(Integer, nullable=True)
    is_completed = Column(Boolean, default=False)

# 创建所有表
Base.metadata.create_all(engine)

# 初始化数据
def init_data():
    # 检查是否已有数据
    if session.query(GameState).count() == 0:
        # 创建初始游戏状态
        game_state = GameState()
        session.add(game_state)
        
        # 创建初始资源
        resources = [
            Resource(name='木材', amount=500, type='基础资源'),
            Resource(name='石头', amount=300, type='基础资源'),
            Resource(name='铁矿', amount=200, type='基础资源'),
        ]
        session.add_all(resources)
        
        # 创建初始建筑
        buildings = [
            Building(name='城堡', level=1, effect='提升领地等级', cost_gold=0, cost_food=0, is_built=True),
            Building(name='农场', level=1, effect='增加食物产量', cost_gold=100, cost_food=50, is_built=True),
            Building(name='伐木场', level=1, effect='增加木材产量', cost_gold=150, cost_food=30, is_built=True),
            Building(name='采石场', level=1, effect='增加石头产量', cost_gold=200, cost_food=40, is_built=False),
            Building(name='铁矿', level=1, effect='增加铁矿产量', cost_gold=250, cost_food=50, is_built=False),
        ]
        session.add_all(buildings)
        
        # 创建初始角色
        characters = [
            Character(name='玩家领主', type='领主', level=1, skills='管理、外交', loyalty=100),
            Character(name='资深顾问', type='NPC', level=3, skills='战略、资源管理', loyalty=70),
        ]
        session.add_all(characters)
        
        # 创建初始任务
        tasks = [
            Task(title='建设采石场', description='建造采石场以增加石头产量', reward_gold=100, reward_food=50, is_available=True),
            Task(title='提升人口', description='通过建设和资源管理提升领地人口', reward_gold=150, reward_population=20, is_available=True),
        ]
        session.add_all(tasks)
        
        # 创建初始剧情
        story = Story(
            title='新领主上任',
            content='你是一位新上任的领主，继承了一片小小的领地。你的任务是发展领地，成为强大的领主。',
            choices='[{"text": "开始建设领地", "next_story_id": 2}, {"text": "探索周边地区", "next_story_id": 3}]',
            is_completed=False
        )
        session.add(story)
        
        session.commit()

# 初始化数据
init_data()
