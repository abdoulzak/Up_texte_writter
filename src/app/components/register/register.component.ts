import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User, variablelocale } from 'src/app/models/request';
import { Router } from '@angular/router';
//import { PhoneNumber } from '../login/login.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  numero='';
  password='';
  isLoarding = false;
  message='';
  user = User;
  variablelocale= variablelocale;


  //phoneNumber = new PhoneNumber()

  constructor(private httpClient: HttpClient,
              private router: Router,
              private auth: AuthServiceService) { }

  ngOnInit(): void {
    this.isLoarding =false;
  }

  onDigitInput(event: any){
    let element;
    if (event.code !== 'Backspace')2
      if (event.srcElement.value.length == 2){
        element = event.srcElement.nextElementSibling;
      }

    if (event.code === 'Backspace'){
      if (event.srcElement.value.length == 0){
        element = event.srcElement.previousElementSibling;
      }
    }

    if(element == null){
      return
    }
    else
      element.focus();
  }

  public savenumero(value: any){
    this.numero = value;
  }

  public savepassword(value: any){
      this.password = value;
  }

  onSubmit(){/*
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    if (this.phoneNumber.e164.length == 12) {
      this.isLoarding = true;
      this.httpClient.post<any>(this.variablelocale.user_url+'signup',
      {
          numero: this.phoneNumber.e164,
          motdepass: this.password,
      }, httpOptions)
      .subscribe(data => {
          if (data.status=200){
            this.isLoarding = false;
            this.variablelocale.registermessage = "Inscription réussi Connectez-vous !"
            this.router.navigate(['login']);
          }else if (data.status=406){
            this.isLoarding = false;
            this.message="L'utilisateur existe déja !";
          }
        },
        (error) => {
          this.isLoarding = false;
          this.message = error.error.message;
        });
    }else{
      this.isLoarding = false;
      this.message="Numero incorrecte !";
    }*/
  }
}
