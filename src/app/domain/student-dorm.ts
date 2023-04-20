import { MenuItem } from "./menu-item";

export interface StudentDorm {
    id: number | null;
    dormName: string;
    menuItems: MenuItem[];
  }
  