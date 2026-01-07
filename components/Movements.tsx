
import React, { useState } from 'react';
import { Asset, Movement, Department, AssetStatus } from '../types';

interface MovementsProps {
  assets: Asset[];
  departments: Department[];
  movements: Movement[];
  onAddMovement: (mov: Movement, newStatus?: AssetStatus) => void;
}

const Movements: React.FC<MovementsProps> = ({ assets, departments, movements, onAddMovement }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [toDeptId, setToDeptId] = useState('');
  const [newStatus, setNewStatus] = useState<AssetStatus>(AssetStatus.IN_OPERATION);
  const [reason, setReason] = useState('');

  const handleMove = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.id === selectedAssetId);
    if (!asset) return;

    const movement: Movement = {
      id: Math.random().toString(36).substr(2, 9),
      assetId: selectedAssetId,
      fromDepartmentId: asset.departmentId,
      toDepartmentId: toDeptId,
      date: new Date().toISOString(),
      reason: reason
    };

    onAddMovement(movement, newStatus);
    setShowModal(false);
    setSelectedAssetId('');
    setToDeptId('');
    setReason('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Movimentações</h2>
          <p className="text-slate-500 text-sm">Histórico de transferências e mudanças de estado.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200"
        >
          🔄 Nova Movimentação
        </button>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden border border-slate-100 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-sm font-medium">
            <tr>
              <th className="p-6">Ativo / Patrimônio</th>
              <th className="p-6">Origem</th>
              <th className="p-6">Destino</th>
              <th className="p-6">Data</th>
              <th className="p-6">Motivo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {movements.length === 0 ? (
                <tr>
                    <td colSpan={5} className="p-10 text-center text-slate-400">Nenhuma movimentação registrada.</td>
                </tr>
            ) : movements.slice().reverse().map(mov => {
              const asset = assets.find(a => a.id === mov.assetId);
              const from = departments.find(d => d.id === mov.fromDepartmentId);
              const to = departments.find(d => d.id === mov.toDepartmentId);
              return (
                <tr key={mov.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="font-semibold text-slate-800">{asset?.name || 'Excluído'}</div>
                    <div className="text-xs text-slate-400 font-mono">{asset?.tag}</div>
                  </td>
                  <td className="p-6 text-slate-600 text-sm">{from?.name || '---'}</td>
                  <td className="p-6 text-slate-600 text-sm">{to?.name || '---'}</td>
                  <td className="p-6 text-slate-500 text-sm">
                    {new Date(mov.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </td>
                  <td className="p-6 text-slate-500 text-sm max-w-xs truncate">{mov.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-in zoom-in duration-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Transferir Ativo</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
            </div>
            <form onSubmit={handleMove} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Selecionar Ativo</label>
                <select 
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                  value={selectedAssetId}
                  onChange={e => setSelectedAssetId(e.target.value)}
                >
                  <option value="">Selecione um ativo...</option>
                  {assets.map(a => <option key={a.id} value={a.id}>{a.name} ({a.tag})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Novo Destino</label>
                  <select 
                    required
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    value={toDeptId}
                    onChange={e => setToDeptId(e.target.value)}
                  >
                    <option value="">Selecione...</option>
                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Novo Status</label>
                  <select 
                    required
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                    value={newStatus}
                    onChange={e => setNewStatus(e.target.value as AssetStatus)}
                  >
                    {Object.values(AssetStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Motivo da Movimentação</label>
                <textarea 
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none h-24"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="Ex: Substituição de hardware, Mudança de setor, Envio para reparo técnico..."
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movements;
