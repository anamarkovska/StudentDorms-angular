import { MenuItem } from "./menu-item";

export interface MenuCategory {
    id: number;
    name: string;
    items: MenuItem[];
  }
  