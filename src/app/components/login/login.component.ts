import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { User, variablelocale } from 'src/app/models/request';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  numero='';
  password='';
  isLoarding = false;
  regiterbtn = false;
  clientbtn = false;
  redacteurbtn = false;
  message='';
  erreur = ''
  erreurnumero = ''
  erreurmotdepasse = ''

  redacteurForm!: FormGroup;
  clientForm!: FormGroup;
  loginForm!: FormGroup;

  loginpage = true
  redacteurpage = false
  clientpage = false

  user = User;

  variablelocale= variablelocale;
  

  constructor(private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private router: Router,
              private _snackBar: MatSnackBar,
              private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.isLoarding =false;
    
    this.redacteurForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    })

    this.clientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    })

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

  }

  changePage(str:string){
    str === "login" ? this.loginpage = true : this.loginpage = false
    str === "client" ? this.clientpage = true : this.clientpage = false
    str === "redacteur" ? this.redacteurpage = true : this.redacteurpage = false
  }

  onRegisterRedacteur(){
    this.redacteurbtn = true;
    if (this.redacteurForm.invalid) {
      this.redacteurbtn = false;
      return;
    }
    this.httpClient.post(`${environment.url}user/register/redacteur`, this.redacteurForm.value)
      .subscribe((data:any) => {
        this.redacteurbtn= false;
        if (data){
          this.changePage("login")
          this.message = "";
          this.redacteurForm.reset();
        }
      },
      (erreur)=> {
        this.redacteurbtn= false;
        this.message = "Une erreur vient de se produire, veuillez ressayer plus tard!";
      } );
  }

  onRegisterClient(){
    console.log( this.clientForm.value);
    
    this.clientbtn = true;
    if (this.clientForm.invalid) {
      this.clientbtn = false;
      return;
    }
    this.httpClient.post(`${environment.url}user/register/client`, this.clientForm.value)
      .subscribe((data:any) => {
        this.clientbtn= false;
        if (data._id){
          this.changePage("login")
          this.message = "";
          this.clientForm.reset();
        }
      },
      (erreur)=> {
        this.clientbtn= false;
        this.message = "Une erreur vient de se produire, veuillez ressayer plus tard!";
      } );
  }

  onSubmit(){
    this.isLoarding = true;
    if (this.loginForm.invalid) {
      this.regiterbtn = false;
      return;
    }
    this.httpClient.post(`${environment.url}user/login`, this.loginForm.value)
    .subscribe((data:any) => {        
      this.isLoarding= false;
      console.log(data);
      if (data){
          this.auth.setSession(data);
      }
    },
    (erreur)=> {
      this.message = "E-mail ou mot de passe invalide!";
      this.isLoarding= false;
    } );
  }
  
}
