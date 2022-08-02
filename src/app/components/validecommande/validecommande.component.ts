import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
//import { openKkiapayWidget, addKkiapayListener,removeKkiapayListener  } from 'kkiapay'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-validecommande',
  templateUrl: './validecommande.component.html',
  styleUrls: ['./validecommande.component.scss']
})
export class ValidecommandeComponent implements OnInit {

  isLoarding = false
  isLoardingKkia = false
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
  montant = 0

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router,
              private _snackBar: MatSnackBar) { }


  snackBar(str: String) {
    this._snackBar.open(`${str}`, 'OK', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  open() {
    /*openKkiapayWidget({
      amount: this.montant,
      api_key: "d124ad70f42211eca56ad905c440058f",
      sandbox: true,
      phone: "97000000",
      email: localStorage.getItem('email')+"",
      name: localStorage.getItem('nom')+" "+localStorage.getItem('prenom'),
      firstname: localStorage.getItem('nom')+"",
      lastname: localStorage.getItem('nom')+"",
    })*/
  }

  successHandler() {
    this.httpClient.get(`${environment.url}commande/payer/${this._id}`)
    .subscribe((data:any) => {
      this.snackBar("Commande effectuer avec succes. Votre commande attend sagement les réflexions d'un rédacteur")
      this.router.navigate(['./home/accueil'])
    },
    (erreur)=> {
    });
  }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getcommande(params['dd']);
    });
    //addKkiapayListener('success',this.successHandler);
  }

  getcommande(val:any) {
    this.isLoarding= true;
    this.httpClient.get(`${environment.url}commande/${val}`)
    .subscribe((data:any) => {
      this.isLoarding= false;      
      if (data.commandes._id){
        this.expressionclef = data.commandes.expressionclef
        this._id = data.commandes._id
        this.user = data.commandes.user
        this.titre = data.commandes.titre
        this.statut = data.commandes.statut
        this.domaine = data.commandes.domaine
        this.langue = data.commandes.langue
        this.nombredemot = data.commandes.nombredemot
        this.datelivraison = data.commandes.datelivraison
        this.consigne = data.commandes.consigne
        this.piecejoint = data.commandes.piecejoint
        this.date = data.commandes.date

        this.qualite = data.niveauredacteur.forfaitclient
        this.montant = +this.qualite * +this.nombredemot
      }
    },
    (erreur)=> {
      this.isLoarding= false;
    } );
  }


  ngOnDestroy(){
    //removeKkiapayListener('success',this.successHandler)
  }
}
