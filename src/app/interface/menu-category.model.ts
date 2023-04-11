import { MenuItem } from './menu-item.model';

export interface MenuCategory {
  id: number;
  name: string;
  items: MenuItem[];
}
