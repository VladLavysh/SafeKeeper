export interface Item {
  id: string;
  name: string;
  login: string;
  password: string;
  group: 'top' | 'standard' | 'low';
  notes?: string;
}

export type Action = 'create' | 'update' | 'delete'