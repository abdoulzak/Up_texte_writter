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
  messageredacteur=''
  messageclient=''
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
  
  isValid = false
  isValid0 = false
  isValid1 = false
  isValid2 = false

  pwd=''
  pwdc=''
  isValid3 = false
  isValid4 = false
/////
  
  cisValid = false
  cisValid0 = false
  cisValid1 = false
  cisValid2 = false

  cpwd=''
  cpwdc=''
  cisValid3 = false
  cisValid4 = false

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

  verifpwdc(data:any){
    this.isValid4 = true
    this.pwdc = data.value
    if(this.pwd === this.pwdc){
      this.isValid3 = true
      this.isValid4 = false
    } else this.isValid3 = false
  }

  verifpwd(data:any){
    this.pwd = data.value
    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])/;
    this.isValid = passwordCriteria.test(data.value);

    const passwordCriteria0 = /(?=.*[0-9])/;
    this.isValid0 = passwordCriteria0.test(data.value);

    const passwordCriteria1 = /(?=.{8,})/;
    this.isValid1 = passwordCriteria1.test(data.value);

    const passwordCriteria2 = /(?=.*[!@#$%&^*])/;
    this.isValid2 = passwordCriteria2.test(data.value);
  }

  verifpwdc2(data:any){
    this.cisValid4 = true
    this.cpwdc = data.value
    if(this.cpwd === this.cpwdc){
      this.cisValid3 = true
      this.cisValid4 = false
    } else this.cisValid3 = false
  }

  verifpwd2(data:any){
    this.cpwd = data.value
    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])/;
    this.cisValid = passwordCriteria.test(data.value);

    const passwordCriteria0 = /(?=.*[0-9])/;
    this.cisValid0 = passwordCriteria0.test(data.value);

    const passwordCriteria1 = /(?=.{8,})/;
    this.cisValid1 = passwordCriteria1.test(data.value);

    const passwordCriteria2 = /(?=.*[!@#$%&^*])/;
    this.cisValid2 = passwordCriteria2.test(data.value);
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
        this.messageredacteur = erreur.error.message;
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
        this.messageclient = erreur.error.message;
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
      if (data){
          this.auth.setSession(data);
      }
    },
    (erreur)=> {
      this.message = erreur.error.message;
      this.isLoarding= false;
    } );
  }
  
}
