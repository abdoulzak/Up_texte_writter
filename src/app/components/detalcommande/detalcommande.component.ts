import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalcommande',
  templateUrl: './detalcommande.component.html',
  styleUrls: ['./detalcommande.component.scss']
})
export class DetalcommandeComponent implements OnInit {


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
  montant = 0


  constructor() { }

  ngOnInit(): void {
  }

}
