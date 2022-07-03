import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler,
  HttpRequest, HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("userToken");
        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return next.handle(cloned);
        }
        else
            return next.handle(req); 
    }
}
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}