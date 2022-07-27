import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-testniveau',
  templateUrl: './testniveau.component.html',
  styleUrls: ['./testniveau.component.scss']
})
export class TestniveauComponent implements OnInit {

  isLoarding = false

  constructor(  private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _bottomSheetRef: MatBottomSheetRef<TestniveauComponent>) { }

  ngOnInit(): void {
  }

  open(){
    this.isLoarding = true;
    this.httpClient.post(`${environment.url}testniveau/start`,
    {})
    .subscribe((res:any) => {
      this._bottomSheetRef.dismiss()
      //this.isLoarding = false;
      this.router.navigate(['./home/test-de-niveau/'+res._id])
    },
    (error)=> { 
      this.isLoarding = false;
    });
  }

}
