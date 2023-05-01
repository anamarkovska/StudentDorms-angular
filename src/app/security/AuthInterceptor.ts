import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (req.url.endsWith('/login')) {
      return next.handle(req);
    }


    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
        withCredentials: true // Add this line to include withCredentials property
      });
      console.log('Authorization header added:', authReq.headers.get('Authorization'));
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
