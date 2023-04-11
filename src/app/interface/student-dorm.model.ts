import { MenuItem } from './menu-item.model';

export interface StudentDorm {
  id: number | null;
  dormName: string;
  menuItems: MenuItem[];
}
