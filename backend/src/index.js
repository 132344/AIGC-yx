const express = require('express');
const cors = require('cors');
const aiService = require('./services/aiService');
const app = express();
const port = 8000;

// 中间件
app.use(cors());
app.use(express.json());

// 模拟游戏数据
let gameState = {
  resources: {
    gold: 1000,
    wood: 500,
    food: 300,
    population: 50
  },
  story: {
    currentChapter: 0,
    chapters: [
      {
        title: '新晋领主',
        content: '你是一位新晋的领主，刚刚获得了自己的领地。你的领地位于一片肥沃的平原上，周围有茂密的森林和丰富的资源。你站在领地的中心，看着这片属于你的土地，心中充满了雄心壮志。你知道，要成为一名成功的领主，你需要发展经济，建设军队，与其他领主建立联系，应对各种挑战。'
      },
      {
        title: '领地建设',
        content: '你开始着手建设你的领地。首先，你需要确保基本的资源供应，所以你组织村民们开垦农田，砍伐木材，开采矿石。随着资源的积累，你开始建造各种建筑，包括农田、伐木场、矿场、兵营等。你的领地逐渐变得繁荣起来，人口也在不断增加。'
      },
      {
        title: '外部接触',
        content: '随着领地的发展，你开始与周围的其他领主接触。有的领主对你表示友好，愿意与你建立贸易关系；有的则对你虎视眈眈，视你为潜在的竞争对手。你需要谨慎处理这些关系，在外交和军事之间找到平衡，确保领地的安全和发展。'
      }
    ]
  }
};

// API路由
app.get('/api/game/state', (req, res) => {
  res.json(gameState);
});

app.post('/api/game/action', async (req, res) => {
  const { action, choice } = req.body;
  
  switch(action) {
    case 'gatherResources':
      gameState.resources.gold += 100;
      gameState.resources.wood += 50;
      gameState.resources.food += 30;
      break;
    case 'trainArmy':
      if (gameState.resources.gold >= 200 && gameState.resources.food >= 100) {
        gameState.resources.gold -= 200;
        gameState.resources.food -= 100;
      }
      break;
    case 'buildStructure':
      if (gameState.resources.gold >= 300 && gameState.resources.wood >= 200) {
        gameState.resources.gold -= 300;
        gameState.resources.wood -= 200;
      }
      break;
    case 'makeChoice':
      // 调用AI API生成剧情
      const context = gameState.story.chapters[gameState.story.currentChapter].content;
      const storyResult = await aiService.generateStory(choice, context);
      // 简单解析AI返回的结果
      const storyParts = storyResult.split('\n\n选择：');
      if (storyParts.length === 2) {
        gameState.story.chapters.push({
          title: `选择后果`,
          content: storyParts[0]
        });
        gameState.story.currentChapter = gameState.story.chapters.length - 1;
      }
      break;
  }
  
  res.json(gameState);
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});