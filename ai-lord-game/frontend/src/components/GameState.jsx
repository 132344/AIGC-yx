const GameState = ({ gameState }) => {
  return (
    <div className="space-y-6 fade-in">
      <h2 className="text-3xl font-bold gold-text text-center decorative-border pb-6">
        🏰 游戏状态 🏰
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 资源状态卡片 */}
        <div className="parchment-card rounded-xl p-6 fade-in" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-xl font-bold mb-4 text-medieval-brown border-b-2 border-medieval-brown pb-2">
            💎 资源状态
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-medieval-parchment/50 rounded-lg">
              <span className="font-medium text-medieval-dark flex items-center space-x-2">
                <span>💰</span>
                <span>金币:</span>
              </span>
              <span className="text-2xl font-bold text-yellow-600">{gameState.gold}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-medieval-parchment/50 rounded-lg">
              <span className="font-medium text-medieval-dark flex items-center space-x-2">
                <span>🍞</span>
                <span>食物:</span>
              </span>
              <span className="text-2xl font-bold text-green-600">{gameState.food}</span>
            </div>
          </div>
        </div>

        {/* 人口与士气卡片 */}
        <div className="parchment-card rounded-xl p-6 fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-xl font-bold mb-4 text-medieval-brown border-b-2 border-medieval-brown pb-2">
            👥 人口与士气
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-medieval-parchment/50 rounded-lg">
              <span className="font-medium text-medieval-dark flex items-center space-x-2">
                <span>👨‍👩‍👧‍👦</span>
                <span>人口:</span>
              </span>
              <span className="text-2xl font-bold text-blue-600">{gameState.population}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-medieval-dark flex items-center space-x-2">
                  <span>❤️</span>
                  <span>士气:</span>
                </span>
                <span className={`text-2xl font-bold ${gameState.morale > 70 ? 'text-green-600' : gameState.morale > 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {gameState.morale}%
                </span>
              </div>
              <div className="w-full bg-medieval-stone rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${gameState.morale > 70 ? 'bg-green-500' : gameState.morale > 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(gameState.morale, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 游戏进度卡片 */}
      <div className="parchment-card rounded-xl p-6 fade-in" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-xl font-bold mb-4 text-medieval-brown border-b-2 border-medieval-brown pb-2">
          📅 游戏进度
        </h3>
        <div className="flex items-center space-x-6">
          <div className="flex-1">
            <div className="w-full bg-medieval-stone rounded-full h-4 overflow-hidden">
              <div
                className="bg-medieval-gold h-full rounded-full transition-all duration-500 shimmer"
                style={{ width: `${Math.min((gameState.day / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-medieval-brown">{gameState.day}</div>
            <div className="text-medieval-stone">第 天</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameState;
