const GameState = ({ gameState }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary fantasy-font">游戏状态</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-2 text-primary">资源状态</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">金币:</span>
              <span className="text-yellow-600 font-bold">{gameState.gold}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">食物:</span>
              <span className="text-green-600 font-bold">{gameState.food}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold mb-2 text-primary">人口与士气</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">人口:</span>
              <span className="text-blue-600 font-bold">{gameState.population}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">士气:</span>
              <span className={`font-bold ${gameState.morale > 70 ? 'text-green-600' : gameState.morale > 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                {gameState.morale}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-2 text-primary">游戏进度</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${Math.min((gameState.day / 100) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          <span className="font-medium">第 {gameState.day} 天</span>
        </div>
      </div>
    </div>
  );
};

export default GameState;
