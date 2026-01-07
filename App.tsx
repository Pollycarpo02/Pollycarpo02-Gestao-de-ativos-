
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AssetList from './components/AssetList';
import Movements from './components/Movements';
import { Asset, Department, Movement, AssetStatus } from './types';
import { getAssets, getDepartments, getMovements, saveAsset, saveDepartment, saveMovement } from './db';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);

  useEffect(() => {
    setAssets(getAssets());
    setDepartments(getDepartments());
    setMovements(getMovements());
  }, []);

  const handleAddAsset = (asset: Asset) => {
    saveAsset(asset);
    setAssets(getAssets());
  };

  const handleAddMovement = (mov: Movement, newStatus?: AssetStatus) => {
    saveMovement(mov);
    
    // Update asset department and status
    const asset = assets.find(a => a.id === mov.assetId);
    if (asset) {
      const updatedAsset = { 
        ...asset, 
        departmentId: mov.toDepartmentId,
        status: newStatus || asset.status 
      };
      saveAsset(updatedAsset);
    }
    
    setMovements(getMovements());
    setAssets(getAssets());
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard assets={assets} departments={departments} />;
      case 'assets':
        return <AssetList assets={assets} departments={departments} onAddAsset={handleAddAsset} />;
      case 'movements':
        return <Movements assets={assets} departments={departments} movements={movements} onAddMovement={handleAddMovement} />;
      case 'admin':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Configurações Administrativas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="glass-card p-6 rounded-3xl">
                  <h3 className="font-bold text-lg mb-4">Departamentos & Centros de Custo</h3>
                  <div className="space-y-3">
                    {departments.map(d => (
                      <div key={d.id} className="flex justify-between items-center p-3 bg-white/50 rounded-xl border border-slate-100">
                        <div>
                          <p className="font-semibold text-slate-800">{d.name}</p>
                          <p className="text-xs text-slate-500">CC: {d.costCenter}</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">Ativo</span>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 w-full py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium">+ Adicionar Novo Setor</button>
               </div>
               <div className="glass-card p-6 rounded-3xl">
                  <h3 className="font-bold text-lg mb-4">Gerenciamento de Notas Fiscais</h3>
                  <p className="text-slate-500 text-sm mb-4">Central de documentos vinculados aos ativos da empresa.</p>
                  <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                    <span className="text-4xl mb-2">📂</span>
                    <p className="text-slate-400 text-sm">Upload de NF-es desativado nesta prévia.</p>
                  </div>
               </div>
            </div>
          </div>
        );
      default:
        return <Dashboard assets={assets} departments={departments} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
