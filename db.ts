
import { Asset, Department, Movement, AssetStatus, AssetCategory } from './types';

const INITIAL_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Tecnologia da Informação', costCenter: '100.01' },
  { id: '2', name: 'Recursos Humanos', costCenter: '100.02' },
  { id: '3', name: 'Operações / Logística', costCenter: '200.05' },
  { id: '4', name: 'Administrativo', costCenter: '100.03' },
];

const INITIAL_ASSETS: Asset[] = [
  {
    id: 'a1',
    name: 'MacBook Pro M3',
    tag: 'TI-001',
    category: AssetCategory.IT,
    status: AssetStatus.IN_OPERATION,
    departmentId: '1',
    purchaseDate: '2023-11-15',
    purchaseValue: 15000,
    description: 'Equipamento de alta performance para desenvolvimento.',
    nfes: [{ id: 'nf1', number: '12345', type: 'Compra', date: '2023-11-15' }]
  },
  {
    id: 'a2',
    name: 'Cadeira Ergonômica Herman Miller',
    tag: 'MOB-042',
    category: AssetCategory.FURNITURE,
    status: AssetStatus.IN_STOCK,
    departmentId: '4',
    purchaseDate: '2024-01-10',
    purchaseValue: 8500,
    description: 'Cadeira para diretoria.',
    nfes: []
  }
];

export const getAssets = (): Asset[] => {
  const data = localStorage.getItem('assets');
  return data ? JSON.parse(data) : INITIAL_ASSETS;
};

export const saveAsset = (asset: Asset) => {
  const assets = getAssets();
  const index = assets.findIndex(a => a.id === asset.id);
  if (index >= 0) {
    assets[index] = asset;
  } else {
    assets.push(asset);
  }
  localStorage.setItem('assets', JSON.stringify(assets));
};

export const getDepartments = (): Department[] => {
  const data = localStorage.getItem('departments');
  return data ? JSON.parse(data) : INITIAL_DEPARTMENTS;
};

export const saveDepartment = (dept: Department) => {
  const depts = getDepartments();
  depts.push(dept);
  localStorage.setItem('departments', JSON.stringify(depts));
};

export const getMovements = (): Movement[] => {
  const data = localStorage.getItem('movements');
  return data ? JSON.parse(data) : [];
};

export const saveMovement = (mov: Movement) => {
  const movs = getMovements();
  movs.push(mov);
  localStorage.setItem('movements', JSON.stringify(movs));
};
