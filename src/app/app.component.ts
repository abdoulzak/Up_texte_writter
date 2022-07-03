import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User, variablelocale } from './models/request';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Savings Money';
  user = User;
  variablelocale= variablelocale;

  @HostBinding('class') className = '';


  constructor(private httpClient: HttpClient, 
              private router: Router,
              private auth: AuthServiceService,
              private overlay: OverlayContainer ) {

   if (localStorage.getItem('darkClassName') == 'darkMode'){
     this.variablelocale.toggleControl.setValue(true)
     this.className = localStorage.getItem('darkClassName')!
   }

   this.variablelocale.toggleControl.valueChanges.subscribe((darkMode: any) => {
     const darkClassName = 'darkMode';
     this.className = darkMode ? darkClassName : '';
     if (darkMode) {
       localStorage.setItem('darkClassName', darkClassName)
       this.overlay.getContainerElement().classList.add(darkClassName);
     } else {
       localStorage.removeItem('darkClassName')
       this.overlay.getContainerElement().classList.remove(darkClassName);
     }
   }); }
  
  
  phone= "";

  ngOnInit(): void {
    this.phone = localStorage.getItem('phone')!;
  }

  logOut(){
    this.auth.logout();
  }
}
