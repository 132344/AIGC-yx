<template>
  <div class="game">
    <div class="game-header">
      <h1>领主领地</h1>
      <div class="resources">
        <div class="resource-item">
          <span class="resource-name">金币</span>
          <span class="resource-value">{{ resources.gold }}</span>
        </div>
        <div class="resource-item">
          <span class="resource-name">木材</span>
          <span class="resource-value">{{ resources.wood }}</span>
        </div>
        <div class="resource-item">
          <span class="resource-name">粮食</span>
          <span class="resource-value">{{ resources.food }}</span>
        </div>
        <div class="resource-item">
          <span class="resource-name">人口</span>
          <span class="resource-value">{{ resources.population }}</span>
        </div>
      </div>
    </div>
    
    <div class="game-content">
      <div class="actions">
        <button @click="gatherResources" class="action-btn">
          收集资源
        </button>
        <button @click="trainArmy" class="action-btn">
          训练军队
        </button>
        <button @click="buildStructure" class="action-btn">
          建造建筑
        </button>
        <button @click="viewStory" class="action-btn">
          查看剧情
        </button>
      </div>
      
      <div class="story-section">
        <h2>当前剧情</h2>
        <div class="story-content">
          {{ currentStory }}
        </div>
        <div class="story-choices" v-if="storyChoices.length > 0">
          <button 
            v-for="(choice, index) in storyChoices" 
            :key="index"
            @click="makeChoice(choice)"
            class="choice-btn"
          >
            {{ choice }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
    return {
      resources: {
        gold: 1000,
        wood: 500,
        food: 300,
        population: 50
      },
      currentStory: '你是一位新晋的领主，刚刚获得了自己的领地。你的领地位于一片肥沃的平原上，周围有茂密的森林和丰富的资源。你需要发展你的领地，建设军队，与其他领主交流，最终成为一方霸主。',
      storyChoices: [
        '开始建设领地',
        '探索周围环境',
        '与邻近领主建立联系'
      ]
    }
  },
  methods: {
    gatherResources() {
      this.resources.gold += 100
      this.resources.wood += 50
      this.resources.food += 30
    },
    trainArmy() {
      if (this.resources.gold >= 200 && this.resources.food >= 100) {
        this.resources.gold -= 200
        this.resources.food -= 100
        alert('军队训练成功！')
      } else {
        alert('资源不足！')
      }
    },
    buildStructure() {
      if (this.resources.gold >= 300 && this.resources.wood >= 200) {
        this.resources.gold -= 300
        this.resources.wood -= 200
        alert('建筑建造成功！')
      } else {
        alert('资源不足！')
      }
    },
    viewStory() {
      this.$router.push('/story')
    },
    makeChoice(choice) {
      // 这里将来会调用后端API获取AI生成的剧情
      this.currentStory = `你选择了：${choice}。随着你的选择，领地的发展方向发生了变化...`
      this.storyChoices = [
        '继续发展经济',
        '加强军事力量',
        '开展外交活动'
      ]
    }
  }
}
</script>

<style scoped>
.game {
  padding: 20px;
  min-height: 100vh;
}

.game-header {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.game-header h1 {
  color: #f39c12;
  margin-bottom: 15px;
}

.resources {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.resource-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}

.resource-name {
  font-size: 14px;
  color: #bdc3c7;
  margin-bottom: 5px;
}

.resource-value {
  font-size: 20px;
  font-weight: bold;
  color: #f39c12;
}

.game-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
}

.story-section {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.story-section h2 {
  color: #f39c12;
  margin-bottom: 15px;
}

.story-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  min-height: 150px;
  line-height: 1.6;
}

.story-choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choice-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.choice-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #f39c12;
}

@media (max-width: 768px) {
  .game-content {
    grid-template-columns: 1fr;
  }
}
</style>