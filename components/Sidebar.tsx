
import React from 'react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'assets', label: 'Meus Ativos', icon: '📦' },
    { id: 'movements', label: 'Movimentações', icon: '🔄' },
    { id: 'admin', label: 'Deptos & Custos', icon: '🏢' },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col p-4 shadow-sm">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <span className="bg-indigo-600 text-white p-1 rounded-lg">AF</span> AssetFlow
        </h1>
        <p className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-1">Enterprise Asset Mgmt</p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id
                ? 'bg-indigo-50 text-indigo-700 font-semibold'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
            {activeView === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t border-slate-100 pt-6">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">John Doe</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
