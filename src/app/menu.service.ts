import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuCategory } from './domain/menu-category';
import { MenuItem } from './domain/menu-item';
import { StudentDorm } from './domain/student-dorm';
import { menuItemDto } from './domain/menuItemDto';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private apiUrl = 'http://localhost:8080/menu';

  constructor(private http: HttpClient) { }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  createMenuItem(menuItem: menuItemDto): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, menuItem);
  }

  getMenuItemById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}/${id}`);
  }

  updateMenuItem(id: number, menuItem: menuItemDto): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/edit/${id}`, menuItem);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getMenuItemsByCategory(categoryId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/category/${categoryId}`);
  }

   getMenuItemsByStudentDorm(dormId: number): Observable<MenuItem[]> {
     return this.http.get<MenuItem[]>(`${this.apiUrl}/student-dorms/${dormId}`);
   }
  getMenuItemsByCategoryAndStudentDorm(categoryID:number, dormId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/student-dorms/${dormId}`);
  }

  getAllCategories(): Observable<MenuCategory[]> {
    const url = `${this.apiUrl}/category`;
    return this.http.get<MenuCategory[]>(url);
  }

  getAllStudentDorms(): Observable<StudentDorm[]> {
    const url = `${this.apiUrl}/student-dorms`;
    return this.http.get<StudentDorm[]>(url);
  }
}
