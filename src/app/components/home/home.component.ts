import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { variablelocale } from 'src/app/models/request';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { environment } from 'src/environments/environment';
import { NewcommandeComponent } from '../newcommande/newcommande.component';
import { TestniveauComponent } from '../testniveau/testniveau.component';

export interface Section {
  nom: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  variablelocale= variablelocale;
  panelOpenState = false;
  token= "";
  notification:any
  isLoarding = false
  listemestestniveau:any

  @HostBinding('class') className = '';

  folders: Section[] = [
    {
      nom: 'Accueil',
      url: 'accueil',
      icon: 'home',
    },{
      nom: 'Trouvé du texte',
      url: 'trouvetexte',
      icon: 'find_in_page',
    },{
      nom: 'Preferences',
      url: 'settings',
      icon: 'settings',
    },{
      nom: 'Profil',
      url: 'profil',
      icon: 'account_box',
    },
  ];

  toggleControl = variablelocale.toggleControl


  usertype = localStorage.getItem("type")
  
  constructor( private httpClient: HttpClient,
               public dialog: MatDialog,
               public auth: AuthServiceService,
               private overlay: OverlayContainer,
              private _bottomSheet: MatBottomSheet ) { }

  openNewcommande(): void {
    this._bottomSheet.open(NewcommandeComponent);
  }

  openTest(): void {
    this._bottomSheet.open(TestniveauComponent);
  }

  ngOnInit(): void {
    this.mestestniveau()
    this.token = localStorage.getItem('userToken')!;
    //this.variablelocale.notificationCount(this.http)

    if (!this.token){
      this.logOut()
    }
  }

  mestestniveau(){
    this.listemestestniveau = [];
    this.isLoarding = true;
    this.httpClient.get(`${environment.url}testniveau`)
    .subscribe((res:any) => {
      this.listemestestniveau = res;
      this.isLoarding = false;
    },
    (error)=> { 
      this.isLoarding = false;
    });
  }
  logOut(){
    this.auth.logout();
  }

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });

}
