import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { path: '/game-state', icon: '🏰', label: '游戏状态' },
    { path: '/resources', icon: '📦', label: '资源管理' },
    { path: '/buildings', icon: '🏗️', label: '建筑系统' },
    { path: '/tasks', icon: '📜', label: '任务系统' },
    { path: '/story', icon: '📖', label: '剧情系统' },
    { path: '/battle', icon: '⚔️', label: '战斗系统' },
  ];

  return (
    <div className="w-full lg:w-72">
      <div className="stone-container wood-border rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6 gold-text text-center decorative-border pb-4">
          ⚜️ 领主控制台 ⚜️
        </h2>
        <nav className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-medieval-gold text-medieval-dark font-bold shadow-lg'
                    : 'text-medieval-parchment hover:bg-medieval-brown/30 border border-medieval-stone hover:border-medieval-gold'
                }`
              }
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
