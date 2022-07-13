import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-writtetexte',
  templateUrl: './writtetexte.component.html',
  styleUrls: ['./writtetexte.component.scss']
})
export class WrittetexteComponent implements OnInit {

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
        this.redaction = data.commandes.redaction

        this.qualite = data.niveauredacteur.forfaitclient
        this.montant = +this.qualite * +this.nombredemot
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
      this.getcommande(params['dd']);
    });
  }

  autoSaveEditeur(data:any){
    //localStorage.setItem(this.id, data)
    console.log(data)
  }
}
