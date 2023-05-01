import { Injectable } from '@angular/core';
import {  userRequest } from './domain/userRequest';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }
  register(user: userRequest): Observable<userRequest> {
    return this.http.post<userRequest>(`${this.apiUrl}/register`, user); 
  }

    login(user: userRequest): Observable<any> { {
      return this.http.post<any>(`${this.apiUrl}/authenticate`,  user );
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
