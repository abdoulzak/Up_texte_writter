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
        
        if (token != null) {
            const cloned = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type' : 'application/json; charset=utf-8',
                    'Accept'       : 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            return next.handle(cloned);
        }
        else {
            const cloned = req.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type' : 'application/json; charset=utf-8',
                    'Accept'       : 'application/json',
                },
            });
            return next.handle(cloned);
        }
    }
}
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}