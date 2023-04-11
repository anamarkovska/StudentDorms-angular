import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../interface/menu-item.model';
import { Observable } from 'rxjs';
import { MenuCategory } from '../interface/menu-category.model';
import { StudentDorm } from '../interface/student-dorm.model';


@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private apiUrl = 'http://localhost:8080/menu';

  constructor(private http: HttpClient) { }

  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(this.apiUrl);
  }

  createMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.apiUrl, menuItem);
  }

  getMenuItemById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.apiUrl}/${id}`);
  }

  updateMenuItem(id: number, menuItem: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/${id}`, menuItem);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMenuItemsByCategory(categoryId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  getMenuItemsByStudentDorm(dormId: number): Observable<MenuItem[]> {
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
