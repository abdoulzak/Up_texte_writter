import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatChipInputEvent } from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { variablelocale } from 'src/app/models/request';
import { environment } from 'src/environments/environment';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-newcommande',
  templateUrl: './newcommande.component.html',
  styleUrls: ['./newcommande.component.scss']
})
export class NewcommandeComponent implements OnInit {

  commandeForm!: FormGroup;
  isLoarding = false

  variablelocale= variablelocale;

  constructor(private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar,private _bottomSheetRef: MatBottomSheetRef<NewcommandeComponent>) {}

  ngOnInit(): void {
    this.commandeForm = this.formBuilder.group({
      titre: ['', Validators.required],
      domaine: ['', Validators.required],
      langue: ['', Validators.required],
      nombredemot: ['', Validators.required],
      qualite: ['', Validators.required],
      datelivraison: ['', Validators.required],
      expressionclef: [[]],
      //nombreaparition: ['', Validators.required],
      consigne: [''],
      piecejoint: [''],
    })

    this.getNiveau();
  }

  langues: any = ['français', 'anglais', 'espagnole'];
  qualites: any = [];
  keywords: any =['Expression 1', 'Expression 2', 'Expression 3'];
  
  getNiveau() {
    this.httpClient.get(`${environment.url}niveau`)
    .subscribe((data:any) => {
      this.qualites = data 
    },
    (erreur)=> {
      this.isLoarding= false;
    } );
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.push(event.value);
      event.chipInput!.clear();
    }
  }

  removeKeyword(keyword: string) {
    this.keywords.delete(keyword);
  }

  onSubmit(){
    console.log(this.commandeForm.value);
    this.isLoarding = true;
    if (this.commandeForm.invalid) {
      this.isLoarding = false;
      return;
    }
    this.httpClient.post(`${environment.url}commande`, this.commandeForm.value)
    .subscribe((data:any) => {        
      this.isLoarding= false;
      if (data._id){
        this._bottomSheetRef.dismiss()
        this.router.navigate(['commande/'+data._id])
      }
    },
    (erreur)=> {
      this.isLoarding= false;
    } );
  }
  
}
