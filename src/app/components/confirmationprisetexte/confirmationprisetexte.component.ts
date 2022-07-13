import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { variablelocale } from 'src/app/models/request';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-confirmationprisetexte',
  templateUrl: './confirmationprisetexte.component.html',
  styleUrls: ['./confirmationprisetexte.component.scss']
})
export class ConfirmationprisetexteComponent implements OnInit {

  isLoarding = false;
  variablelocale = variablelocale;
  item = variablelocale.selectetexte
  //confirmation = false


  constructor(private httpClient: HttpClient, 
    private router: Router,
    private _bottomSheetRef: MatBottomSheetRef<ConfirmationprisetexteComponent>) {}

  ngOnInit(): void {
  }

  accepter(){
    this.isLoarding = true;
    this.httpClient.post(`${environment.url}commande/soumission/${this.item._id}`,
    {user: localStorage.getItem("_id")})
    .subscribe((res:any) => {
      console.log(res);
      this.isLoarding = false;
      this._bottomSheetRef.dismiss()
      this.router.navigate([`home/writter/${this.item._id}`])
      //this.confirmation = true
    },
    (error)=> { 
      this.isLoarding = false;
    });
  }

  startredaction(){}
}
