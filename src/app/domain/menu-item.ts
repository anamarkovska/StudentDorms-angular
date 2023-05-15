export interface MenuItem {
  id: number;
  name: string;
  category: {
    id: number,
    name: string
  }
  studentDorm: {
    id: number,
    dormName: string
  }
  date: string;
  startTime: string;
  endTime: string;
}
