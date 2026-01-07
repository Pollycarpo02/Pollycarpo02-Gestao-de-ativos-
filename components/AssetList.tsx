
import React, { useState } from 'react';
import { Asset, AssetStatus, AssetCategory, Department } from '../types';

interface AssetListProps {
  assets: Asset[];
  departments: Department[];
  onAddAsset: (asset: Asset) => void;
}

const AssetList: React.FC<AssetListProps> = ({ assets, departments, onAddAsset }) => {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('');
  
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    name: '',
    tag: '',
    category: AssetCategory.IT,
    status: AssetStatus.IN_STOCK,
    purchaseDate: new Date().toISOString().split('T')[0],
    purchaseValue: 0,
    departmentId: departments[0]?.id || '',
    description: '',
    nfes: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assetToAdd: Asset = {
      ...newAsset as Asset,
      id: Math.random().toString(36).substr(2, 9),
    };
    onAddAsset(assetToAdd);
    setShowModal(false);
    setNewAsset({
        name: '', tag: '', category: AssetCategory.IT, status: AssetStatus.IN_STOCK,
        purchaseDate: new Date().toISOString().split('T')[0], purchaseValue: 0,
        departmentId: departments[0]?.id || '', description: '', nfes: []
    });
  };

  const filteredAssets = assets.filter(a => 
    a.name.toLowerCase().includes(filter.toLowerCase()) || 
    a.tag.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Inventário de Ativos</h2>
          <p className="text-slate-500 text-sm">Gerencie o ciclo de vida dos bens da empresa.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
        >
          <span className="text-xl">+</span> Novo Ativo
        </button>
      </div>

      <div className="glass-card rounded-2xl p-4 flex gap-4 items-center">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Buscar por nome ou patrimônio..." 
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="glass-card p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-slate-400 hover:text-indigo-600">✏️</button>
             </div>
             
             <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-2xl">
                  {asset.category === AssetCategory.IT ? '💻' : 
                   asset.category === AssetCategory.FURNITURE ? '🪑' : 
                   asset.category === AssetCategory.VEHICLE ? '🚗' : '🛠️'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 leading-tight">{asset.name}</h4>
                  <p className="text-xs text-slate-500 font-mono uppercase mt-1">{asset.tag}</p>
                </div>
             </div>

             <div className="space-y-3">
               <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Status</span>
                 <span className={`font-semibold ${
                   asset.status === AssetStatus.IN_OPERATION ? 'text-green-600' :
                   asset.status === AssetStatus.UNDER_REPAIR ? 'text-orange-600' : 'text-slate-600'
                 }`}>{asset.status}</span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Departamento</span>
                 <span className="text-slate-800 font-medium truncate max-w-[150px]">
                   {departments.find(d => d.id === asset.departmentId)?.name}
                 </span>
               </div>
               <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Valor de Compra</span>
                 <span className="text-slate-800 font-bold">
                   {asset.purchaseValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                 </span>
               </div>
             </div>

             <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex -space-x-2">
                   {asset.nfes.length > 0 ? (
                      <span className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs text-indigo-700 border-2 border-white" title="NFe Vinculada">📄</span>
                   ) : (
                      <span className="text-[10px] text-slate-400">Sem NFe</span>
                   )}
                </div>
                <button className="text-indigo-600 text-sm font-semibold hover:underline">Ver Detalhes →</button>
             </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Novo Ativo</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Ativo</label>
                <input 
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  value={newAsset.name}
                  onChange={e => setNewAsset({...newAsset, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Número de Patrimônio</label>
                <input 
                  required
                  placeholder="Ex: TI-001"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  value={newAsset.tag}
                  onChange={e => setNewAsset({...newAsset, tag: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                <select 
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  value={newAsset.category}
                  onChange={e => setNewAsset({...newAsset, category: e.target.value as AssetCategory})}
                >
                  {Object.values(AssetCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Valor de Compra (R$)</label>
                <input 
                  type="number"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  value={newAsset.purchaseValue}
                  onChange={e => setNewAsset({...newAsset, purchaseValue: parseFloat(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Departamento Inicial</label>
                <select 
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  value={newAsset.departmentId}
                  onChange={e => setNewAsset({...newAsset, departmentId: e.target.value})}
                >
                  {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                 <label className="block text-sm font-medium text-slate-700 mb-1">Descrição / Observações</label>
                 <textarea 
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none h-20"
                    value={newAsset.description}
                    onChange={e => setNewAsset({...newAsset, description: e.target.value})}
                 />
              </div>
              <div className="col-span-2 flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Salvar Ativo</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetList;
