import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { openKkiapayWidget, addKkiapayListener,removeKkiapayListener  } from 'kkiapay'
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

  constructor(private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router) { }
  open() {
    openKkiapayWidget({
      amount: 1000,
      api_key: "xxxxxxxxxxxxxxx",
      sandbox: true,
      phone: "97000000",
    })
  }

  successHandler() {
    console.log("payment success...");
  }
  
  ngOnInit() {
    addKkiapayListener('success',this.successHandler)
    this.route.params.subscribe(params => {
      this.getcommande(params['dd']);
    });
  }

  getcommande(val:any) {
    this.isLoarding= true;
    this.httpClient.get(`${environment.url}commande/${val}`)
    .subscribe((data:any) => {
      this.isLoarding= false;
      console.log(data);
      
      if (data._id){
        this.qualite = data.qualite[0].qualite
        this.expressionclef = data.expressionclef
        this._id = data._id
        this.user = data.user
        this.titre = data.titre
        this.statut = data.statut
        this.domaine = data.domaine
        this.langue = data.langue
        this.nombredemot = data.nombredemot
        this.datelivraison = data.datelivraison
        this.consigne = data.consigne
        this.piecejoint = data.piecejoint
        this.date = data.date

        this.montant = +data.qualite[0].forfaitclient * +this.nombredemot
      }
    },
    (erreur)=> {
      this.isLoarding= false;
    } );
  }


  ngOnDestroy(){
    removeKkiapayListener('success',this.successHandler)
  }
}
