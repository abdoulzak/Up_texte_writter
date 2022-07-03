import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { variablelocale } from 'src/app/models/request';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { NewcommandeComponent } from '../newcommande/newcommande.component';

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
  
  constructor( private http: HttpClient,
               public dialog: MatDialog,
               public auth: AuthServiceService,
               private overlay: OverlayContainer,
              private _bottomSheet: MatBottomSheet ) { }

  openNewcommande(): void {
    this._bottomSheet.open(NewcommandeComponent);
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('userToken')!;
    //this.variablelocale.notificationCount(this.http)

    if (!this.token){
      this.logOut()
    }
  }

  logOut(){
    this.auth.logout();
  }

  joinGroupe(){
 /*   const dialogRef = this.dialog.open(JoinGroupeComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => { });
*/
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
