
export enum AssetStatus {
  IN_OPERATION = 'Em Operação',
  IN_STOCK = 'Em Estoque',
  UNDER_REPAIR = 'Em Reparo',
  DISUSED = 'Desuso',
  FOR_REPLACEMENT = 'Para Substituição'
}

export enum AssetCategory {
  IT = 'TI / Informática',
  FURNITURE = 'Mobiliário',
  VEHICLE = 'Veículo',
  MACHINERY = 'Maquinário',
  TOOLS = 'Ferramentas'
}

export interface Department {
  id: string;
  name: string;
  costCenter: string;
}

export interface NFeRecord {
  id: string;
  number: string;
  type: 'Compra' | 'Movimentação' | 'Descarte';
  date: string;
  fileUrl?: string;
}

export interface Asset {
  id: string;
  name: string;
  tag: string; // Patrimônio
  category: AssetCategory;
  status: AssetStatus;
  departmentId: string;
  purchaseDate: string;
  purchaseValue: number;
  description: string;
  nfes: NFeRecord[];
}

export interface Movement {
  id: string;
  assetId: string;
  fromDepartmentId: string;
  toDepartmentId: string;
  date: string;
  reason: string;
}
