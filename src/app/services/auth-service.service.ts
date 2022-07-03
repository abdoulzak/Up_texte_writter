import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { variablelocale } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  variablelocale = variablelocale;

  constructor(private http: HttpClient,
              private router: Router) { }
/*
  login(email:string, password:string ) {
    return this.http.post<any>(this.variablelocale.user_url+'/api/auth/login', {email, password})
        .subscribe(() => this.setSession);
  }
  */
/*
  setSessionl() {
    localStorage.setItem('userId', "79");
    localStorage.setItem('userToken', "le token .");
    localStorage.setItem('phone', "65100003");//+22995357828
    localStorage.setItem('islogin', "true");
    this.getExpiration();
  }
*/
  setSession(data: any) {
    localStorage.setItem('userToken', data.token);
    localStorage.setItem('_id', data.user.user._id);
    localStorage.setItem('nom', data.user.user.nom);
    localStorage.setItem('prenom', data.user.user.prenom);
    localStorage.setItem('type', data.user.user.type);
    localStorage.setItem('numero', data.user.user.numero);
    localStorage.setItem('email', data.user.user.email);
    localStorage.setItem('date', data.user.user.date);
    
    this.router.navigate(['./home/accueil']);
  }

  logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("_id");
    localStorage.removeItem("nom");
    localStorage.removeItem("prenom");
    localStorage.removeItem("type");
    localStorage.removeItem("numero");
    localStorage.removeItem("email");
    localStorage.removeItem("date")
    this.router.navigate(['./login']);
  }

  getUserId() {
    return localStorage.getItem("_id");
  }

  isLogin() {
    const token = localStorage.getItem('userToken');
    if (token){
      
      const expires_in = new Date(Date.now() + (parseInt(localStorage.getItem('expires_in')!.toString())*24*60*60000));
      const date1 = formatDate(new Date(),'yyyy-MM-dd','en_US');
      const date2 = formatDate(expires_in,'yyyy-MM-dd','en_US');
      if ( date1 > date2 ){
        this.logout();
        return false;
      }else{
        //this.router.navigate(['./home']);
        return true
      }
    }
    this.logout();
    return false;
  }

  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) {
    return payload;
  }

  loggedIn() {
    return this.isLogin();
  }
}
