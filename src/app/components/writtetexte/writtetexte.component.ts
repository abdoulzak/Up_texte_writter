import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-writtetexte',
  templateUrl: './writtetexte.component.html',
  styleUrls: ['./writtetexte.component.scss']
})
export class WrittetexteComponent implements OnInit {

  id =''
  detail = ''
  startsave = true
  constructor() { }

  ngOnInit(): void {
  }

  autoSaveEditeur(data:any){
    //localStorage.setItem(this.id, data)
    console.log(data)
  }
}
