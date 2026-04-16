import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="w-full lg:w-64 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 text-primary fantasy-font">领主控制台</h2>
      <nav className="space-y-2">
        <NavLink 
          to="/game-state" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
          }
        >
          游戏状态
        </NavLink>
        <NavLink 
          to="/resources" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
          }
        >
          资源管理
        </NavLink>
        <NavLink 
          to="/buildings" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
          }
        >
          建筑系统
        </NavLink>
        <NavLink 
          to="/tasks" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
          }
        >
          任务系统
        </NavLink>
        <NavLink 
          to="/story" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
          }
        >
          剧情系统
        </NavLink>
        <NavLink 
          to="/battle" 
          className={({ isActive }) => 
            `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-100'}`
          }
        >
          战斗系统
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
