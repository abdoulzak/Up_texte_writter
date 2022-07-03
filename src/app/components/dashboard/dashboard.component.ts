import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { variablelocale } from 'src/app/models/request';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { RequestService } from 'src/app/services/request.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  panelOpenState = false;
  listedata :any;
  listemestextesclient :any;
  listemestextesredacteur :any;
  variablelocale = variablelocale;
  isLoarding = false;

  mestexte = true
  recherchetexte = false
  message = false
  redacteurliste = false

  usertype = localStorage.getItem("type")
  

  constructor(private httpClient: HttpClient, 
              private router: Router,
              private httpRequest: RequestService,
              private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(data: any): void {
    //this._bottomSheet.open(DepotComponent);
  }

  openBottomSheet2(): void {
    //this._bottomSheet.open(BottomSheetOverviewSouscription);
  }

  ngOnInit(): void {
    this.liste();
    console.log(this.usertype);
    
    if (this.usertype=='client') {
      this.listemestexteclient()
    }
    
  }
  changepage(page:string):void {
    if (page == '1') {
      this.mestexte = true
      this.recherchetexte = false
      this.message = false
      this.redacteurliste = false
    }else
    if (page == '2') {
      this.mestexte = false
      this.recherchetexte = true
      this.message = false
      this.redacteurliste = false
    }else
    if (page == '3') {
      this.mestexte = false
      this.recherchetexte = false
      this.message = false
      this.redacteurliste = true
    }else
    if (page == '4') {
      this.mestexte = false
      this.recherchetexte = false
      this.message = true
      this.redacteurliste = false
    }
  }
  liste(){
    this.isLoarding = true;
    this.httpClient.get(`${environment.url}commande`)
    .subscribe((res:any) => {
      this.listedata = res;
      this.isLoarding = false;
    },
    (error)=> { 
      this.isLoarding = false;
    });
  }
  listemestexteclient(){
    this.isLoarding = true;
    this.httpClient.get(`${environment.url}commande/client/${localStorage.getItem("_id")}`)
    .subscribe((res:any) => {
      this.listemestextesclient = res;
      this.isLoarding = false;
    },
    (error)=> { 
      this.isLoarding = false;
    });
  }

}
