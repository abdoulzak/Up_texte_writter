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
    this.getNiveau();
    this.getdomaines();
    this.gettypes();
    this.commandeForm = this.formBuilder.group({
      titre: ['', Validators.required],
      domaine: ['', Validators.required],
      langue: ['', Validators.required],
      nombredemot: ['', Validators.required],
      qualite: ['', Validators.required],
      datelivraison: ['', Validators.required],
      expressionclef: [[]],
      type: [''],
      //nombreaparition: ['', Validators.required],
      consigne: [''],
      piecejoint: [''],
    })

  }

  langues: any = ['français', 'anglais', 'espagnole'];
  qualites: any = [];
  domaines: any = [];
  consignes : any =[];
  keywords: any =[];
  types: any =[];
  
  getdomaines() {
    this.httpClient.get(`${environment.url}domaine`)
    .subscribe((data:any) => {
      this.domaines = data 
    });
  }

  getNiveau() {
    this.httpClient.get(`${environment.url}niveau`)
    .subscribe((data:any) => {
      this.qualites = data 
    });
  }

  gettypes() {
    this.httpClient.get(`${environment.url}type`)
    .subscribe((data:any) => {
      this.types = data 
    });
  }

  getconsigne(type:any) {
    this.httpClient.get(`${environment.url}consigne/${type}`)
    .subscribe((data:any) => {
      console.log(data);
      
      this.commandeForm.patchValue({
        consigne:  data.consigne
      });
    });
  }

  addKeywordFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.keywords.push(" "+event.value);
      event.chipInput!.clear();

      this.commandeForm.patchValue({
        expressionclef:  this.keywords
      });

    }
  }

  onchange(data:any) {
    console.log(data);
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
