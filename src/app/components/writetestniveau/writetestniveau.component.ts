import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-writetestniveau',
  templateUrl: './writetestniveau.component.html',
  styleUrls: ['./writetestniveau.component.scss']
})
export class WritetestniveauComponent implements OnInit {

  isLoarding = false
  qualite = ''
  expressionclef = ''
  _id = ''
  user = ''
  titre = ''
  statut = ''
  domaine = ''
  langue = ''
  nombredemot = ''
  datelivraison = ''
  consigne = ''
  piecejoint = ''
  date = ''
  redaction = ''
  montant = 0
  motecrit = 0

  getcommande(val:any) {
    this.isLoarding= true;
    this.httpClient.get(`${environment.url}testniveau/mn/${val}`)
    .subscribe((data:any) => {
      this.isLoarding= false;
        this._id = data._id
        this.titre = data.titre
        //this.statut = data.statut
        this.nombredemot = data.nombredemot
        this.date = data.date

        if (!localStorage.getItem(this._id)) {
          this.redaction = data.redaction
          var newdata = this.redaction.replace("<p>", "")
          newdata = newdata.replace("</p>", "")
          newdata = newdata.replace("<br>", "")
          this.motecrit = newdata.split(" ").length
        }
    },
    (erreur)=> {
      this.isLoarding= false;
    } );
  }


  constructor(  private route: ActivatedRoute,
                private httpClient: HttpClient,
                private router: Router,
                private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (localStorage.getItem(params['dd'])) {
        this.redaction = localStorage.getItem(params['dd'])+""

        var newdata = this.redaction.replace("<p>", "")
        newdata = newdata.replace("</p>", "")
        newdata = newdata.replace("<br>", "")
        this.motecrit = newdata.split(" ").length
      }
      this.getcommande(params['dd']);
    });
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  snackBar(str: String) {
    this._snackBar.open(`${str}`, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  saveredaction(){
    this.isLoarding = true;
    this.httpClient.post(`${environment.url}testniveau/save/${this._id}`,
    {redaction: localStorage.getItem(this._id)})
    .subscribe((res:any) => {
      this.isLoarding = false;
      this.snackBar("Enrégistrement réussit!")
    },
    (error)=> { 
      this.isLoarding = false;
    });
  }
  
  lvr(){
    this.isLoarding = true;
    this.httpClient.post(`${environment.url}testniveau/lvr/${this._id}`, {})
    .subscribe((res:any) => {
      this.router.navigate(['/..'])
      this.isLoarding = false;
      this.snackBar("Livraison réussit!")
    },
    (error)=> { 
      this.isLoarding = false;
    });
  }

  autoSaveEditeur(data:any){
    var newdata = data.replace("/(<([^>]+)>)/gi", "")
    newdata = newdata.replace("</p>", "")
    newdata = newdata.replace("<div>", " ")
    newdata = newdata.replace("</div>", "")
    newdata = newdata.replace("<br>", "")
    newdata = newdata.replace("&nbsp;", "")

    this.motecrit = newdata.split(" ").length

    localStorage.setItem(this._id, data)
    /*console.log(localStorage.getItem(this._id));
    console.log(data);
    console.log(newdata);*/
  }

}
