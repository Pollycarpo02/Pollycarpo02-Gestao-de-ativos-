
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { Asset, AssetStatus, Department } from '../types';

interface DashboardProps {
  assets: Asset[];
  departments: Department[];
}

const Dashboard: React.FC<DashboardProps> = ({ assets, departments }) => {
  // Stats
  const totalValue = assets.reduce((sum, a) => sum + a.purchaseValue, 0);
  const statusCounts = Object.values(AssetStatus).map(status => ({
    name: status,
    value: assets.filter(a => a.status === status).length
  }));

  const categoryCounts = assets.reduce((acc: any, asset) => {
    acc[asset.category] = (acc[asset.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(categoryCounts).map(cat => ({
    name: cat,
    value: categoryCounts[cat]
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Visão Geral</h2>
        <p className="text-slate-500">Status atual do inventário de ativos da companhia.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Total de Ativos</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{assets.length}</p>
          <div className="mt-2 text-xs text-green-600 font-medium">↑ 12% em relação ao mês anterior</div>
        </div>
        <div className="glass-card p-6 rounded-3xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Valor em Inventário</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <div className="mt-2 text-xs text-indigo-600 font-medium">Depreciação estimada: 8%</div>
        </div>
        <div className="glass-card p-6 rounded-3xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Em Manutenção</p>
          <p className="text-3xl font-bold text-orange-500 mt-1">
            {assets.filter(a => a.status === AssetStatus.UNDER_REPAIR).length}
          </p>
          <div className="mt-2 text-xs text-slate-400 font-medium">Média de 4 dias p/ reparo</div>
        </div>
        <div className="glass-card p-6 rounded-3xl shadow-sm">
          <p className="text-slate-500 text-sm font-medium">Departamentos Ativos</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{departments.length}</p>
          <div className="mt-2 text-xs text-slate-400 font-medium">Todos centros de custo ok</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Ativos por Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusCounts}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Chart */}
        <div className="glass-card p-6 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Distribuição por Categoria</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="truncate">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table (Simulated) */}
      <div className="glass-card p-6 rounded-3xl shadow-sm overflow-hidden">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Ativos Recentemente Adicionados</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-sm font-medium">
                <th className="pb-4">Ativo</th>
                <th className="pb-4">Patrimônio</th>
                <th className="pb-4">Departamento</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {assets.slice(-5).reverse().map((asset) => (
                <tr key={asset.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-medium text-slate-800">{asset.name}</td>
                  <td className="py-4 text-slate-500 font-mono text-xs">{asset.tag}</td>
                  <td className="py-4 text-slate-500">
                    {departments.find(d => d.id === asset.departmentId)?.name || 'N/A'}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      asset.status === AssetStatus.IN_OPERATION ? 'bg-green-100 text-green-700' :
                      asset.status === AssetStatus.IN_STOCK ? 'bg-blue-100 text-blue-700' :
                      asset.status === AssetStatus.UNDER_REPAIR ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-700 font-medium">
                    {asset.purchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
