export interface Item {
  id: string;
  name: string;
  login: string;
  password: string;
  notes?: string;
}

export type Action = 'create' | 'update' | 'delete'