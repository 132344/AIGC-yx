<template>
  <div class="home">
    <div class="hero">
      <h1>AI领主游戏</h1>
      <p>小说驱动的策略游戏</p>
      <button @click="startGame" class="start-btn">开始游戏</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
    startGame() {
      this.$router.push('/game')
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.hero {
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 60px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 48px;
  margin-bottom: 20px;
  color: #f39c12;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

p {
  font-size: 24px;
  margin-bottom: 40px;
  color: #ecf0f1;
}

.start-btn {
  background: linear-gradient(45deg, #e67e22, #f39c12);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 20px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(243, 156, 18, 0.4);
}

.start-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(243, 156, 18, 0.6);
}
</style>