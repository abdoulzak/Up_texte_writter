import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(public auth: AuthServiceService, public router: Router) {}
  
  canActivate(): boolean {
    if (localStorage.getItem("islogin") == "true") {
      return true;
    }else{
      return false;
    }
  }

}
