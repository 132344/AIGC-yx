<template>
  <div class="story">
    <div class="story-header">
      <h1>游戏剧情</h1>
      <button @click="backToGame" class="back-btn">返回游戏</button>
    </div>
    
    <div class="story-content">
      <div class="story-chapters">
        <h2>剧情章节</h2>
        <div class="chapter-list">
          <div 
            v-for="(chapter, index) in chapters" 
            :key="index"
            class="chapter-item"
            :class="{ active: currentChapter === index }"
            @click="selectChapter(index)"
          >
            <span class="chapter-number">第{{ index + 1 }}章</span>
            <span class="chapter-title">{{ chapter.title }}</span>
          </div>
        </div>
      </div>
      
      <div class="chapter-content">
        <h3>{{ chapters[currentChapter].title }}</h3>
        <div class="chapter-text">
          {{ chapters[currentChapter].content }}
        </div>
        <div class="chapter-actions">
          <button 
            @click="prevChapter" 
            class="nav-btn" 
            :disabled="currentChapter === 0"
          >
            上一章
          </button>
          <button 
            @click="nextChapter" 
            class="nav-btn" 
            :disabled="currentChapter === chapters.length - 1"
          >
            下一章
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Story',
  data() {
    return {
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
  },
  methods: {
    backToGame() {
      this.$router.push('/game')
    },
    selectChapter(index) {
      this.currentChapter = index
    },
    prevChapter() {
      if (this.currentChapter > 0) {
        this.currentChapter--
      }
    },
    nextChapter() {
      if (this.currentChapter < this.chapters.length - 1) {
        this.currentChapter++
      }
    }
  }
}
</script>

<style scoped>
.story {
  padding: 20px;
  min-height: 100vh;
}

.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.story-header h1 {
  color: #f39c12;
}

.back-btn {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
}

.story-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.story-chapters {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.story-chapters h2 {
  color: #f39c12;
  margin-bottom: 15px;
}

.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chapter-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.chapter-item.active {
  background: rgba(243, 156, 18, 0.3);
  border-left: 4px solid #f39c12;
}

.chapter-number {
  font-weight: bold;
  color: #f39c12;
}

.chapter-title {
  color: #ecf0f1;
}

.chapter-content {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.chapter-content h3 {
  color: #f39c12;
  margin-bottom: 15px;
}

.chapter-text {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
  line-height: 1.6;
  min-height: 300px;
}

.chapter-actions {
  display: flex;
  justify-content: space-between;
}

.nav-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
}

.nav-btn:disabled {
  background: #7f8c8d;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .story-content {
    grid-template-columns: 1fr;
  }
}
</style>